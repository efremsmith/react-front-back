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

    

    const postData = async (e) => {
        setTitreForm('Envoi du Formulaire');
        setBoutton('Envoi en cours');
        setIsDisabled(!isDisabled);
        //alert("Envoi");
      
        e.preventDefault();
        const mesDonnees = {
            firstName: firstName,
            lastName: lastName,
        }; 
        
        try {
            
            const fetchOptions = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(mesDonnees),
            }
            const res = await fetch('http://127.0.0.1:8001/api/user/create', fetchOptions)
    
            const data = await res.json()
            //console.log(data.body.users);
            setPosts(data.body.users)

    
            if (res.status === 200) {
                setFirstName("");
                setLastName("");
                setCheckbox("");
                setIsDisabled("");
                setTitreForm("Formulaire d'enregistrement");
                setBoutton("Envoyer");
                setMessage("User created successfully");
            } else {
                
                setMessage("Some error occured");
            };
            
            
          } catch (err) {
            
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
