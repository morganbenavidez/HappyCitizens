import Axios from "axios";
import React from "react";
import { useState } from "react";
import "./../App.css";
import CreateAccountForm from "./CreateAccountForm";
import "./../FormInput.css";

function CreateAccount(props) {
    //new
    const {label, errorMessage, onChange, id, ...inputProps} = props; 
    const [focused, setFocused] = useState(false);
    const handleFocus = (e) => {
        setFocused(true); 
    }


    //new ends 

    return (
        <div className="App">
         <div className="formInput">
                <label>{label}</label>
                <input 
                {...inputProps}
                onChange={onChange}
                onBlur={handleFocus}
                onFocus={() => 
                    inputProps.name==="phone" && setFocused(true)}
                focused={focused.toString()}
                />
                <span>{errorMessage}</span>
            </div>
        </div>
    );
}

export default CreateAccount;
