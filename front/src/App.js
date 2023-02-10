import React from 'react';
import './App.css';
import './styles/style.css';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Home from './components/home';
import About from './components/about';
import Events from './components/events';
import AnnualReport from './components/annual';
import Teams from './components/team';
import Blogs from './components/blogs';
import SignUp from './components/signup'; 


function App() {
return (
	<BrowserRouter>
	<Navbar />
	<Routes>
		<Route exact path="/" element={<Home />} />
		<Route exact path="/about" element={<About />} />
		<Route exact path="/events" element={<Events />} /> 
		<Route exact path="/annual" element={<AnnualReport />} /> 
		<Route exact path="/team" element={<Teams />} /> 
		<Route exact path="/blogs" element={<Blogs />} />
		<Route exact path="/sign-up" element={<SignUp />} /> 
	</Routes>
	</BrowserRouter> 
);
}

export default App;
