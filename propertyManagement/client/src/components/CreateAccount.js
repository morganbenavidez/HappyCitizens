import Axios from "axios";
import React from "react";
import { useState } from "react";
import "./../App.css";

function CreateAccount() {

    const [usernameCreate, setUsernameCreate] = useState("");
    const [passwordCreate, setPasswordCreate] = useState("");
    const [nameCreate, setNameCreate] = useState("");
    const [lastnameCreate, setLastnameCreate] = useState("");
    const [emailCreate, setEmailCreate] = useState("");
    const [phoneCreate, setPhoneCreate] = useState("");
    const [categoryCreate, setCategoryCreate] = useState("");

    const [loginStatus, setLoginStatus] = useState("")

    const register = () => {
        Axios.post('http://localhost:3001/register', {
            username: usernameCreate,
            password: passwordCreate,
            category: categoryCreate,
            name: nameCreate,
            lastname: lastnameCreate,
            email: emailCreate,
            phone: phoneCreate,
        }).then((response) => {
            if (response.data.message == "Username Already Exists.") {
                setLoginStatus(response.data.message);
            } else {
                window.location.href = "/login";
            }
            console.log(response.data);
        });
    };

    return (
        <div className="App">
            <div className="information">
            <div className="givemesomeroomtobreathe">
                <select onChange={(e) => {setCategoryCreate(e.target.value);}}>
                    <option value="h" disabled selected hidden>Select an Account Type</option>
                    <option value="Citizen">Citizen</option>
                    <option value="Government">Government</option>
                    <option value="Super User">Super User</option>
                </select>
            </div>
            <div className="givemesomeroomtobreathe">
                <input 
                    type='text' 
                    placeholder='username' 
                    onChange={(e) => { 
                        setUsernameCreate(e.target.value);
                    }}
                />
            </div>
            <div className="givemesomeroomtobreathe">
                <input 
                    type='text' 
                    placeholder='password' 
                    onChange={(e) => { 
                        setPasswordCreate(e.target.value);
                    }}
                />
            </div>
            <div className="givemesomeroomtobreathe">
                <input 
                    type='text' 
                    placeholder='First Name or Organization' 
                    onChange={(e) => { 
                        setNameCreate(e.target.value);
                    }}
                />
            </div>
            <div className="givemesomeroomtobreathe">
                <input 
                    type='text' 
                    placeholder='Last Name' 
                    onChange={(e) => { 
                        setLastnameCreate(e.target.value);
                    }}
                />
            </div>
            <div className="givemesomeroomtobreathe">
                <input 
                    type='email' 
                    placeholder='Email' 
                    onChange={(e) => { 
                        setEmailCreate(e.target.value);
                    }}
                />
            </div>
            <div className="givemesomeroomtobreathe">
                <input 
                    type='phone' 
                    placeholder='Phone' 
                    onChange={(e) => { 
                        setPhoneCreate(e.target.value);
                    }}
                />
                
            </div>
            <h4 id="phoneinput">Must be in format: (XXX) XXX-XXXX</h4>
            
            <h2>{loginStatus}</h2>
            <button onClick={register}>Register</button>
            </div>
        </div>
    );
}

export default CreateAccount;
