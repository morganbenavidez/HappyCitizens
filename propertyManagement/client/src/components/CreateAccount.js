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
    const errors = {};

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


    function validateUser(){
        var valid = true; 
        if(!nameCreate){
            errors.name="Please Enter your First Name";
            valid = false; 
        } else if(nameCreate.length > 20){
            errors.name="Your first name should not exceed 20 characters";
            valid = false; 
        }
        if(!lastnameCreate){
            errors.lastname="Please Enter your Last Name";
            valid = false;
        } else if(lastnameCreate.length > 20){
            errors.lastname="Your last name should not exceed 20 characters";
            valid = false; 
        }

        if(!usernameCreate){
            errors.username="Please Enter a username";
            valid = false;
        } else if(usernameCreate.length > 20){
            errors.username="Your username should not exceed 20 characters";
            valid = false;
        }

        if(!passwordCreate){
            errors.password="Please Enter a password";
            valid = false;
        } else if(passwordCreate.length < 4){
            errors.password="Your password needs to be at least 4 characters";
            valid = false;
        }

        if (!emailCreate) {
            errors.email = "Please enter your email";
            valid = false;
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailCreate)) {
            errors.email = 'email must be in format: name@example.com';
            valid = false;
          }
          
        
        if (!phoneCreate) {
            valid = false;
            errors.phone = "Please enter your phone number";
        } else if (!/^\(([0-9]{3})\)?[-.●]([0-9]{3})[-.●]([0-9]{4})$/i.test(phoneCreate)) {
            errors.phone = 'phone number must be in format: (xxx)-xxx-xxxx';
            valid = false;
        }
        
        if (valid == false) {
            console.log(errors); 
            return errors; 
        }
        else{
            register();
            return true;
        }

    }

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
            <h2>{loginStatus}</h2>
            <button onClick={(e) => {validateUser()}}>Register</button>
            <div>
               
            </div>
            </div>
        </div>
    );
}

export default CreateAccount;
