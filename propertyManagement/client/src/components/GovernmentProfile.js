import React from "react";

function GovernmentProfile() {
    
    var username = localStorage.getItem("username");
    var category = localStorage.getItem("category");
    var name = localStorage.getItem("name");
    var lastname = localStorage.getItem("lastname");
    var email = localStorage.getItem("email");
    var phone = localStorage.getItem("phone");
    console.log(username);
    console.log(category);
    console.log(name);
    console.log(lastname);
    console.log(email);
    console.log(phone);

    return (
        <div className="App">
            <div className="information">
                <h2>{name} - Government Profile</h2>
            </div>
        </div>
    );
}

export default GovernmentProfile;