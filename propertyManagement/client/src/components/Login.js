import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Axios from 'axios';
import "./../App.css";
import CitizenProfile from "./CitizenProfile";

function Login() {

    let history = useNavigate();

    const [usernameLogin, setUsernameLogin] = useState("");
    const [passwordLogin, setPasswordLogin] = useState("");

    const [loginStatusL, setLoginStatusL] = useState("")

    const [categoryFromLogin, setCategoryFromLogin] = useState("");

    const [userList, setUserList] = useState([]);

    const login = () => {
        Axios.post('http://localhost:3001/login', {
            username: usernameLogin,
            password: passwordLogin,
        },
        {
            withCredentials: true,
        }).then((response) => {
            if (response.data.message) {
                setLoginStatusL(response.data.message);
            } else {
                console.log(response);
                /*console.log(response.data[0].category);*/
                var zuserid = String(response.data.user.userid);
                localStorage.setItem("userid", zuserid);
                var zusername = String(response.data.user.username);
                localStorage.setItem("username", zusername);
                var zcategory = String(response.data.user.category);
                localStorage.setItem("category", zcategory);
                var zname = String(response.data.user.name);
                localStorage.setItem("name", zname);
                var zlastname = String(response.data.user.lastname);
                localStorage.setItem("lastname", zlastname);
                var zemail = String(response.data.user.email);
                localStorage.setItem("email", zemail);
                var zphone = String(response.data.user.phone);
                localStorage.setItem("phone", zphone);
                
                if (zcategory == "1") {
                    window.location.href = '/citizenprofile';
                } else if (zcategory == "2") {
                    window.location.href = '/governmentprofile';
                } else if (zcategory == "4") {
                    window.location.href = '/superuserprofile';
                }
                
                /*console.log("iiiii");
                console.log(response[0]);
                window.location.href = `/citizenprofile/${i}`
                setLoginStatus(response.data[0].id);*/
            
                
            };
        });
    };

    //history.push('/citizenprofile'); // Do this when you push login
    return (

        <div className="App">
            <div className="information">
                <input 
                    type='text' 
                    placeholder='username' 
                    onChange={(e) => { 
                        setUsernameLogin(e.target.value);
                    }}/>
                <input 
                    type='password' 
                    placeholder='password' 
                    onChange={(e) => { 
                        setPasswordLogin(e.target.value);
                    }}/>
                <h2>{loginStatusL}</h2>
                <button onClick={login}>Login</button>
            </div>
        </div>
    );
}
/*
REDIRECT ON CLICK

<button onClick={() => {
                getLoginInformation
                //history('/citizenprofile');
            }}>Login</button>
*/
export default Login;