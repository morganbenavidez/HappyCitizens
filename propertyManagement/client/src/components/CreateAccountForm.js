import "./../Form.css";
import Axios from "axios";
import { useState } from "react";
import CreateAccount from "./CreateAccount"; 

import React from 'react'

function CreateAccountForm() {
    
    const [values, setValues] = useState({
        username:"",
        password:"",
        confirmPassword:"",
        firstname:"",
        lastname:"",
        email:"",
        phone:""
    })
    const [category, setCategory] = useState("");
    const [loginStatus, setLoginStatus] = useState(""); 
    function validateUser(){ 
        if(values.username &&
            values.password &&
            values.confirmPassword &&
            values.firstname &&
            values.lastname &&
            values.email &&
            values.phone &&
            /^[A-Za-z0-9]{3,16}$/i.test(values.username) &&
            /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/i.test(values.password) &&
            values.password === values.confirmPassword &&
            // /^[A-Za-z]$/i.test(values.firstname) &&
            // /^[A-Za-z]$/i.test(values.lastname)  &&
            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email) &&
            /^[0-9]{3}-[0-9]{3}-[0-9]{4}/i.test(values.phone) &&
            category
            ){
                register(); 
        }
    }

    const inputs = [
        {
            id:1,
            name:"username",
            type:"text",
            placeholder:"Username",
            errorMessage:"Username should be 3-16 characters and shouldn't include any special character",
            label:"Username",
            pattern: "^[A-Za-z0-9]{3,16}$",
            required: true 
        },
        {
            id:2,
            name:"password",
            type:"password",
            placeholder:"Password",
            errorMessage:"Password should be 8-20 characters and should include at least 1 letter, 1 number, and 1 special character",
            label:"Password", 
            pattern: "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$",
            required: true 
        },
        {
            id:3,
            name:"confirmPassword",
            type:"password",
            placeholder:"Confirm Password",
            errorMessage:"Passwords must match",
            label:"Confirm Password",
            pattern: values.password,
            required: true 
        },
        {
            id:4,
            name:"firstname",
            type:"text",
            placeholder:"First Name or Organization",
            label:"First Name", 
            errorMessage:"First name must contain letters",
            required: true 
        },
        {
            id:5,
            name:"lastname",
            type:"text",
            placeholder:"Last Name",
            errorMessage:"Last name must contain letters",
            label:"Last Name"        
        },
        {
            id:6,
            name:"email",
            type:"email",
            placeholder:"Email",
            errorMessage:"Please use email format: name@example.com",
            label:"Email", 
            required: true 
        },
        {
            id:7,
            name:"phone",
            type:"text",
            placeholder:"Phone",
            errorMessage:"Please use phone number format: xxx-xxx-xxxx",
            label:"Phone", 
            pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}",
            required: true 
        }
    ]
     
    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    };

    const register = () => {
        Axios.post('http://localhost:3001/register', {
            username: values.username,
            password: values.password,
            category: category,
            name: values.firstname,
            lastname: values.lastname,
            email: values.email,
            phone: values.phone,
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
    <div className="form"> 
        <form>
            <h1>Create An Account</h1>
            <select onChange={(e) => {setCategory(e.target.value);}}
            required = "true">
                <option value="h" disabled selected hidden>Select an Account Type</option>
                <option value="Citizen">Citizen</option>
                <option value="Government">Government</option>
                <option value="Super User">Super User</option>
            </select>
            {inputs.map((input) => (
                <CreateAccount 
                key={input.id} {...input} 
                value={values[input.name]}
                onChange={onChange}/>
            ))}
            <h2>{loginStatus}</h2>
 <button type="button" onClick={(e) => {validateUser()}}>Register</button>        </form>
    </div>
  )
}

export default CreateAccountForm
