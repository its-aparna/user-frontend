import logo from './logo.svg';
import './App.css';
import SignUp from './components/signup.js';
import SignIn from './components/signin';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/dashboard';
import axios from "axios";
import { useSelector } from 'react-redux';


function App() {
    return <>
    
        <Routes>
            <Route path='/' element={<SignUp />} />
            <Route path='/sign-in' element={<SignIn />} />
            <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
    
    </>
}

export default App;
