import axios from "axios";
import { useEffect, useState } from "react";
import api from "../webapi/api.js"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../css/cssMy.css"
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../redux-config/user.slice.js";

export default function Dashboard() {
    let currentUser = useSelector(state => state.user.currentUser);
    let [userList, setUserList] = useState([]);
    let [userInfo, setUserInfo] = useState({});
    let navigate = useNavigate();
    let dispatch = useDispatch();

    axios.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("authorization");
            if (token)
                config.headers.authorization = token;
            return config;
        },
        (err) => {
            Promise.reject(err);
        })

    const findUserList = async () => {
        try {
            let response = await axios.post(api.REF_USER_LIST, { userId: currentUser.userId });
            if (response.data.status)
                setUserList(response.data.result);
        } catch (err) {

        }
    }

    const findInfo = async () => {
        try {
            let response = await axios.post(api.SHOW_INFO, { userId: currentUser.userId });
            setUserInfo(response.data.result);
        } catch (err) {

        }
    }

    const signout = () => {
        dispatch(setCurrentUser(null));
    }
    if (!currentUser) {
        navigate("/sign-in");
    }

    useEffect(() => {
        findUserList();
        findInfo();
    }, [])
    return <>

        {currentUser && <div className="mainDash container-fluid">
            <div className="row">
                <div className="sidebar col-lg-3 bg-light border p-4">
                    <div className="d-flex justify-content-center align-item-center ">
                        <i id="userIcon" class="fas fa-user-circle mt-2 mb-4"></i>
                    </div>
                    <h5 className="textlg">User Name</h5>
                    <h6 className="textsm col-lg-7 mt-1">{userInfo.fname + " " + userInfo.lname}</h6>
                    <h5 className="textlg">e-mail</h5>
                    <h6 className="textsm col-lg-7 mt-1">{currentUser.email}</h6>
                    <h5 className="textlg">Referral Code</h5>
                    <h6 className="textsm col-lg-7 mt-1 mb-3">{currentUser.userRefCode}</h6>
                    <button onClick={signout} className="btn btn-primary border w-100 p-2 mt-4 ">Sign Out</button>
                </div>
                <div className="container col-8 mt-4">
                    <div className="row ">
                        <div className="col-4">
                            <div className="border shadow smdiv p-3 align-items-center ">
                                <center> <h2 className="mt-3">Total Tokens</h2></center>
                                <center><h2 className="mt-3">{userInfo.tokens}</h2></center>
                            </div>

                        </div>
                        <div className="col-4">
                            <div className="smdiv shadow border p-3 ">
                                <center> <h2>Refferal Bonus Tokens</h2></center>
                                <center><h2>{userInfo.tokens - 100}</h2></center>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="smdiv shadow border p-3">
                                <center> <h2>Total Refferal User</h2></center>
                                <center><h2>{userInfo.refUserCount}</h2></center>
                            </div>

                        </div>
                    </div>
                    <div className="row shadow-lg mt-4" id="nextdiv">
                        <div className="container " id="innerDiv">
                            <table className="table table-hover ">
                                <thead id="table-header">
                                    <tr>
                                        <th className="col-1 col-sm-1 col-md-1 col-lg-1">S.No</th>
                                        <th className="col-4 col-sm-4 col-md-4 col-lg-4">Name</th>
                                        <th className="col-4 col-sm-4 col-md-4 col-lg-4">Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userList.map((user, index) => <tr>
                                        <td>{index + 1}</td>
                                        <td>{user.fname.toUpperCase() + " " + user.lname.toUpperCase()}</td>
                                        <td>{user.email}</td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        }
    </>
}