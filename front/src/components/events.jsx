import React, { useState, useRef, useEffect  } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import Blogs from './blogs.jsx';
import axios from 'axios';

export default function Events() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [checkbox, setCheckbox] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [titreForm, setTitreForm] = useState("Formulaire d'enregistrement");
    const [titreBoutton, setBoutton] = useState("Envoyer");
    const buttonElement = useRef(null);
    const [message, setMessage] = useState("");
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8001/api/user/list')
        .then((response) => {
            console.log(response.data.body);
            setPosts(response.data.body.users);
            console.log(posts);
        })
        .catch((error) => {
        console.log(error);
        });
    },[]);

    const headers = {
        'Access-Control-Allow-Credentials':true,
        'Access-Control-Allow-Headers':'Origin,Content-Type,Authorization,X-Requested-With,Content-Range,X-Auth-Token,Content-Disposition,Content-Description,X-Xsrf-Token,ip',
        'Access-Control-Allow-Origin': '*,http://localhost:8001',
        'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-control-Max-Age': '1728000',
        'Authorization': 'JWT fefege...'
    };

    let postData = async (e) => {
        setTitreForm('Envoi du Formulaire');
        setBoutton('Envoi en cours');
        setIsDisabled(!isDisabled);
        //alert("Envoi");
      
        e.preventDefault();
        const mesDonnees = {
            firstName: firstName,
            lastName: lastName,
        }; 

        /*axios.post("http://localhost:8001/api/user/creates",{
            headers: headers,
            title: "Hello World!",
            body: "This is a new post."
            //body : JSON.stringify(mesDonnees),
        })
        .then(function (reponse) {
            //On traite la suite une fois la réponse obtenue 
            console.log(reponse);
        })
        .catch(function (erreur) {
            //On traite ici les erreurs éventuellement survenues
            console.log(erreur);
        });*/

        try {
            
            let res = await fetch("http://127.0.0.1:8001/api/user/create", {
                method: "POST",
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                }),
            });
           
            let resJson = await res.json();
            if (res.status === 200) {
                setIsDisabled(isDisabled)
                setFirstName("");
                setLastName("");
                setCheckbox("");
                setIsDisabled("");
                setTitreForm("Formulaire d'enregistrement");
                setBoutton("Envoyer");
                setMessage("User created successfully");
            } else {
                setIsDisabled(isDisabled)
                setMessage("Some error occured");
            };
            
          } catch (err) {
            setIsDisabled(isDisabled)
            console.log(err);
          }
          setIsDisabled(isDisabled);
    }



    

    return (
        <div>
            <h3 className='titre'> { titreForm } </h3>
            <Form className="create-form" onSubmit={postData}>
                <Form.Field className='element'>
                    <label>First Name</label>
                    <input placeholder='First Name' name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                </Form.Field>
                <Form.Field className='element'>
                    <label>Last Name</label>
                    <input placeholder='Last Name' name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                </Form.Field>
                <Form.Field className='element'>
                    <Checkbox label='I agree to the Terms and Conditions' onChange={(e) => setCheckbox(!checkbox)}/>
                </Form.Field>
                
                <Button ref={buttonElement} disabled={isDisabled} className='bouttonSubmit' type='submit'>{titreBoutton}</Button>
                <div className="message"> {message ? <p>{message}</p> : null} </div>
            </Form>
            <br/>
            <Blogs postListes={posts}/>
        </div>
    )
}
