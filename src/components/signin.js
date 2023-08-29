import axios from "axios";
import { useState } from "react";
import api from "../webapi/api.js"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../css/cssMy.css"
import { setCurrentUser } from "../redux-config/user.slice.js";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    let navigate = useNavigate();
    let user = useSelector(state => state.user.currentUser);
    let dispatch = useDispatch();
    const submit = async (event) => {
        try {
            event.preventDefault();
            let response = await axios.post(api.SIGN_IN, { email: email, password: password });
            if (!response.data.status)
                toast.error("Invalid Information");
            else {
                dispatch(setCurrentUser(response.data.result));
                localStorage.setItem("authorization", response.data.result.veriToken);
                navigate("/dashboard");
            }
        } catch (err) {
            toast.error("Invalid Information");
        }
    }
    
    return <>
        <div className="mainIn container-fluid d-flex justify-content-center align-item-center ">
            <ToastContainer/>
            <div className="col-lg-5 m-auto">
                <form onSubmit={submit} className="main2 p-5 border rounded align-item-center shadow-lg">
                    <h1 className="mb-3 d-flex justify-content-center align-item-center " >Sign Up</h1>
                    <label className=" mb-1"><b>Email</b></label>
                    <input type="email" required className="form-control mb-3  p-1" onChange={(event) => setEmail(event.target.value)} />
                    <label className=" mb-1"><b>Password</b></label>
                    <input type="text" required className="form-control mb-3  p-1" onChange={(event) => setPassword(event.target.value)} />
                    <button type="submit" className="btn btn-primary p-2 w-100 mt-3">Sign In</button>
                </form>
            </div>
        </div>
    </>
}