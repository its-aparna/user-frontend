import axios from "axios";
import { useState } from "react";
import api from "../webapi/api.js"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../css/cssMy.css"
import { ToastContainer } from 'react-toastify';

export default function SignUp() {
    const [fname, setFName] = useState("");
    const [lname, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [cPassword, setCPassword] = useState("")
    const [referralCode, setReferralCode] = useState("")
    let navigate = useNavigate();
    const submit = async (event) => {
        try {
            event.preventDefault();
            if (cPassword != password) {
                toast.error("Incorrect password and confrim password");
            } else {
                let response = await axios.post(api.SIGN_UP, { fname: fname, lname: lname, email: email, password: password, referralCode: referralCode });
                if(response.data.reffWrong){
                   toast.error("Wrong Referral Code");
                }else
                if (!response.data.status)
                    toast.error("SignUp not success")
                else {
                    toast.success("SignUp Success");
                    navigate("/sign-in")
                }
            }
        } catch (err) {
            toast.error("Invalid Information");
        }
    }

    const toSignPage = () => {
        navigate("/sign-in")
    }

    return <>
        <div className="main container-fluid d-flex justify-content-center align-item-center ">
           <div className="col-lg-5 ">
           <ToastContainer/>
            
                <form onSubmit={submit} className="main2 mt-3 p-5 border rounded align-item-center shadow-lg">
                    <h1 className="mb-3 d-flex justify-content-center align-item-center " >Sign In</h1>
                    <div className="row">
                        <div className="col-lg-6">
                            <label className="mt-4 mb-1 text-grey"><b>First Name</b></label>
                            <input type="text" required className="form-control p-1" onChange={(event) => setFName(event.target.value)} />
                        </div>
                        <div className="col-lg-6">
                            <label className="mt-4 mb-1 text-grey"><b>Last Name</b></label>
                            <input type="text" required className="form-control mb-3 p-1" onChange={(event) => setLName(event.target.value)} />
                        </div>
                    </div>


                    <label className=" mb-1"><b>Email</b></label>
                    <input type="email" required className="form-control mb-3  p-1" onChange={(event) => setEmail(event.target.value)} />
                    <label className=" mb-1"><b>Password</b></label>
                    <input type="text" required className="form-control mb-3  p-1" onChange={(event) => setPassword(event.target.value)} />
                    <label className=" mb-1"><b>Confrim Password</b></label>
                    <input type="text" required className="form-control mb-3  p-1" onChange={(event) => setCPassword(event.target.value)} />
                    <label className=" mb-1"><b>Referral Code</b></label>
                    <input type="text" className="form-control mb-3  p-1" onChange={(event) => setReferralCode(event.target.value)} />
                    <button type="submit" className="btn btn-primary p-2 w-100 mt-3">Sign Up</button>
                    <button onClick={toSignPage} className="border p-2 w-100 bg-light mt-4">SignIn</button>
                </form>
            </div>
        </div>
    </>
}