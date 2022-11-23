import Axios from "axios";
import React from "react";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";
import { useState } from "react";

export function CitizenProfile() {

    var userid = localStorage.getItem("userid");
    var username = localStorage.getItem("username");
    var category = localStorage.getItem("category");
    var name = localStorage.getItem("name");
    var lastname = localStorage.getItem("lastname");
    var email = localStorage.getItem("email");
    var phone = localStorage.getItem("phone");
    /*
    console.log(userid);
    console.log(username);
    console.log(category);
    console.log(name);
    console.log(lastname);
    console.log(email);
    console.log(phone);
    */

    const [propertyname, setPropertyName] = useState('');
    const [propertyowner, setPropertyOwner] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [purchaseprice, setPurchasePrice] = useState('');
    const [propertycategory, setPropertyCategory] = useState('');

    const [propertyStatus, setPropertyStatus] = useState('');

    const [newName, setNewName] = useState(0);

    const [propertyList, setPropertyList] = useState([]);

    const isnumber = /\d/;
    const isletter = /[a-zA-Z]/; 
    const errors = {}; 

    //check is number and their legnths
    function validatePropertyName(){
        if(!propertyname){
            errors.propertyname = "Please enter a property name";
            return false;
        }else if(propertyname.length > 20){
            errors.propertyname = "Name must be less than 20 characters"; 
            return false; 
        }else if(isnumber.test(propertyname)){
            errors.propertyname = "Name must not contain numbers"; 
            return false; 
        }
        return true;  
    }

    function validateNewName(){
        if(!newName){
            errors.newName = "Please enter a new name";
            console.log(errors);
            return false;
        }else if(newName.length > 20){
            errors.newName = "Name must be less than 20 characters"; 
            console.log(errors);
            return false; 
        }else if(isnumber.test(propertyname)){
            errors.newName = "Name must not contain numbers"; 
            console.log(errors);
            return false; 
        }
        return true;

    }


    const validateData= () => {
        if(validatePropertyName()){
            return true 
        }
        
        else{
            return false; 
        }
    }

    const addProperty = () => {
        Axios.post('http://localhost:3001/create', {
            propertyname: propertyname,
            propertyowner: userid,
            city: city,
            state: state,
            purchaseprice:purchaseprice,
            propertycategory: propertycategory,
        }, {
            withCredentials: true
        }).then(() => {
            console.log("successful");
            setPropertyList([
                ...propertyList,
                {
                    propertyname: propertyname,
                    propertyowner: userid,
                    city: city,
                    state: state,
                    purchaseprice:purchaseprice,
                    propertycategory: propertycategory,
                },
            ])
        });
    };



    const getProperties = () => {
        Axios.get('http://localhost:3001/properties', { withCredentials: true }).then((response) => {
            if (response.data.success) {
                setPropertyList(response.data.properties);
                console.log(response);
            }
        });
    }


    const updatePropertyName = (id) => {
        Axios.put('http://localhost:3001/update', {
          propertyname: newName, 
          propertyid: id,
        }).then((response) => {
          setPropertyList(propertyList.map((val) => {
            return val.propertyid == id ? {propertyid: val.propertyid, propertyname: newName, 
              propertyowner: userid, city: val.city, state: val.state, 
              purchaseprice: val.purchaseprice, propertycategory: val.propertycategory} :val
          }))
        })
    }

    const deleteProperty = (id) => {
        Axios.delete(`http://localhost:3001/delete/${id}`).then((response)=> {
          setPropertyList(propertyList.filter((val)=> {
            return val.propertyid != id
          }))
        });
    }

    const grantAccess = (id) => {
        Axios.get('http://localhost:3001/grant/${id}') 
    }
    


    return (
        <div className="App">
            <div className="information">
                <div className="givemesomeroomtobreathe">
                    <h2>{name} {lastname} - Citizen Profile</h2>
                </div>
                <div className="givemesomeroomtobreathe">
                    <input
                        type='text'
                        placeholder='Name your Property'
                        onChange={(event) => {
                            setPropertyName(event.target.value)
                        }}
                    />
                </div>
                <div className="givemesomeroomtobreathe">
                    <input
                        type='text'
                        placeholder='City'
                        onChange={(event) => {
                            setCity(event.target.value)
                        }}
                    />
                </div>
                <div className="givemesomeroomtobreathe">
                    <select onChange={(e) => {setState(e.target.value);}}>
                        <option value="h" disabled selected hidden>State</option>
                        <option value="AL">AL</option>
                        <option value="AK">AK</option>
                        <option value="AZ">AZ</option>
                        <option value="AR">AR</option>
                        <option value="CA">CA</option>
                        <option value="CO">CO</option>
                        <option value="CT">CT</option>
                        <option value="DE">DE</option>
                        <option value="DC">DC</option>
                        <option value="FL">FL</option>
                        <option value="GA">GA</option>
                        <option value="HI">HI</option>
                        <option value="ID">ID</option>
                        <option value="IL">IL</option>
                        <option value="IN">IN</option>
                        <option value="IA">IA</option>
                        <option value="KS">KS</option>
                        <option value="KY">KY</option>
                        <option value="LA">LA</option>
                        <option value="ME">ME</option>
                        <option value="MD">MD</option>
                        <option value="MA">MA</option>
                        <option value="MI">MI</option>
                        <option value="MN">MN</option>
                        <option value="MS">MS</option>
                        <option value="MO">MO</option>
                        <option value="MT">MT</option>
                        <option value="NE">NE</option>
                        <option value="NV">NV</option>
                        <option value="NH">NH</option>
                        <option value="NJ">NJ</option>
                        <option value="NM">NM</option>
                        <option value="NY">NY</option>
                        <option value="NC">NC</option>
                        <option value="ND">ND</option>
                        <option value="OH">OH</option>
                        <option value="OK">OK</option>
                        <option value="OR">OR</option>
                        <option value="PA">PA</option>
                        <option value="RI">RI</option>
                        <option value="SC">SC</option>
                        <option value="SD">SD</option>
                        <option value="TN">TN</option>
                        <option value="TX">TX</option>
                        <option value="UT">UT</option>
                        <option value="VT">VT</option>
                        <option value="VA">VA</option>
                        <option value="WA">WA</option>
                        <option value="WV">WV</option>
                        <option value="WI">WI</option>
                        <option value="WY">WY</option>

                    </select>
                </div>
                <div className="givemesomeroomtobreathe">
                    <input 
                        type='number'
                        placeholder='Purchase Price'
                        onChange={(event) => {
                            setPurchasePrice(event.target.value)}} 
                    />
                </div>
                <div className="givemesomeroomtobreathe">
                    <select onChange={(e) => {setPropertyCategory(e.target.value);}}>
                        <option value="h" disabled selected hidden>Property category</option>
                        <option value="Land">Land</option>
                        <option value="Structure">Structure</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Jewelry">Jewelry</option>
                        <option value="Single-Family Home">Single-Family Home</option>
                        <option value="Multi-Family Home">Multi-Family Home</option>
                        <option value="Vehicle">Vehicle</option>
                        <option value="Boat">Boat</option>
                    </select>
                </div>

                <button onClick={() => {
                    if(validateData() == true){
                        addProperty();
                    }else{console.log(errors);
                    }}}>Add Property</button>

                <div className="givemesomeroomtobreathe">
                    <input
                        type='number'
                        placeholder='Username to Grant Access To'
                        />
                        <button onClick={grantAccess}>Grant</button>
                </div>
                
                <button onClick={getProperties}>Show Properties</button>
            </div>
            <div className="properties">
                {propertyList.map((val, key) => {
                    return (
                    <div className="propertyName">
                        <div>
                            <h3>Property Name: {val.propertyname}</h3>
                            <h3>City: {val.city}</h3>
                            <h3>State: {val.state}</h3>
                            <h3>Purchase Price: {val.purchaseprice}</h3>
                            <h3>Category: {val.category}</h3>
                        </div>
                        <div>
                        {" "}
                        <input 
                            type="text" 
                            placeholder="New Name" 
                            onChange={(event) => {
                                setNewName(event.target.value);
                            }} 
                        />
                        <button onClick={()=>{
                            if(validateNewName() == true){
                                updatePropertyName(val.propertyid)
                            }else{
                                validateNewName(); 
                            }}}>Update Name</button>
                        <button onClick={()=>{deleteProperty(val.propertyid)}}>Delete Property</button>
                        </div>
                    </div>
                    )
                })}
            
            </div>
        </div>
    );
}

export default CitizenProfile;