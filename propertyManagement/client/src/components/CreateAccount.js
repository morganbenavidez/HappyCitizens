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


    const validateUser=userData => {
        const errors={};
        if(!userData.name){
            errors.name="Please Enter your First Name";
        } else if(userData.name.legnth > 20){
            errors.name="Your first name should not exceed 20 characters";
        }
        if(!userData.lastname){
            errors.lastname="Please Enter your Last Name";
        } else if(userData.lastname.legnth > 20){
            errors.lastname="Your last name should not exceed 20 characters";
        }

        if(!userData.username){
            errors.username="Please Enter a username";
        } else if(userData.username.legnth > 20){
            errors.username="Your username should not exceed 20 characters";
        }

        if(!userData.password){
            errors.username="Please Enter a password";
        } else if(userData.password.legnth < 8){
            errors.username="Your password needs to be at least 8 characters";
        }

        if (!userData.email) {
            errors.email = "Please enter your email";
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(userData.email)) {
            errors.email = 'Invalid email address';
          }
        
        if (!userData.phone) {
        errors.phone = "Please enter your phone number";
        } else if (!/^(\d{2})? \d{10}$/i.test(userData.phone)) {
        errors.phone = 'Invalid phone number';
        }
        
        if (errors.legnth == 0){
            register(); 
        }

        else{
            return errors; 
        }
    }
    
    // const validateData = (email, phone, name, blah) => {
    //     var x = True
    //     checkemail 
    //         if passes validation: x = True
    //         if fails validation: x = False
    //         showSpecifi
    //     checkphone

    //     if False: showHiddenDivs
    //     else:
    //         Call register
    // }

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
            <div className="float-left">
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
        </div>
    );
}

export default CreateAccount;
