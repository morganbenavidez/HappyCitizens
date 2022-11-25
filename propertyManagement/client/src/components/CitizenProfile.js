import Axios from "axios";
import React from "react";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";
import { useState } from "react";
import "./../Form.css";
import "./../FormInput.css";

export function CitizenProfile() {

    var userid = localStorage.getItem("userid");
    var username = localStorage.getItem("username");
    var category = localStorage.getItem("category");
    var name = localStorage.getItem("name");
    var lastname = localStorage.getItem("lastname");
    var email = localStorage.getItem("email");
    var phone = localStorage.getItem("phone");
    

    const [values, setValues] = useState({
        propertyname:"",
        propertyowner:"",
        city:"",
        state:"",
        purchaseprice:"",
        propertycategory:"",
        propertyList:[],
        newName:0
    })


    const addProperty = () => {
        Axios.post('http://localhost:3001/create', {
            propertyname: values.propertyname,
            propertyowner: userid,
            city: values.city,
            state: values.state,
            purchaseprice: values.purchaseprice,
            propertycategory: values.propertycategory,
        }, {
            withCredentials: true
        }).then(() => {
            console.log("successful");
            setValues.propertyList([
                ...values.propertyList,
                {
                    propertyname: values.propertyname,
                    propertyowner: userid,
                    city: values.city,
                    state: values.state,
                    purchaseprice: values.purchaseprice,
                    propertycategory: values.propertycategory,
                },
            ])
        });
    };



    const getProperties = () => {
        Axios.get('http://localhost:3001/properties', { withCredentials: true }).then((response) => {
            if (response.data.success) {
                setValues.propertyList(response.data.properties);
                console.log(response);
            }
        });
    }


    const updatePropertyName = (id) => {
        Axios.put('http://localhost:3001/update', {
          propertyname: values.newName, 
          propertyid: id,
        }).then((response) => {
          setValues.propertyList(values.propertyList.map((val) => {
            return val.propertyid == id ? {propertyid: val.propertyid, propertyname: values.newName, 
              propertyowner: userid, city: val.city, state: val.state, 
              purchaseprice: val.purchaseprice, propertycategory: val.propertycategory} :val
          }))
        })
    }

    const deleteProperty = (id) => {
        Axios.delete(`http://localhost:3001/delete/${id}`).then((response)=> {
            setValues.propertyList(values.propertyList.filter((val)=> {
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

                <form class = "formInput">
                    <h3>{name} {lastname} - Citizen Profile</h3>
                    <h3>Add a property</h3>
                    <label>
                        Property Name
                        <input 
                        type="text"
                        placeholder="Property Name" 
                        onChange={(event) => {
                            setValues.propertyName(event.target.value)
                        }}
                        required="true"/>
                    </label>
                    <label>
                        City
                        <input 
                        type='text'
                        placeholder='City'
                        onChange={(event) => {
                            setValues.city(event.target.value)
                        }}
                        required="true"/>
                    </label>
                    <label>
                        State
                        <select required="true" onChange={(e) => {setValues.state(e.target.value);}}>
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
                    </label>
                    <label>
                        Purchase Price
                        <input 
                        type='number'
                        placeholder='Purchase Price'
                        onChange={(event) => {
                            setValues.purchaseprice(event.target.value)}} 
                        required="true"/>
                    </label>
                    <label>
                        Category
                        <select required="true" onChange={(e) => {setValues.propertycategory(e.target.value);}}>
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
                    </label>
                    <button onClick={addProperty()}>Add Property</button>
                </form>

                <div class="lookatproperties">
                    <input
                            type='number'
                            placeholder='Username to Grant Access To'
                            />
                    <button onClick={grantAccess}>Grant</button>
                    <button onClick={getProperties}>Show Properties</button>
                </div>

                
            </div>
            <div className="properties">
                {values.propertyList.map((val, key) => {
                    return (
                    <div className="propertyName">
                        <table>
                            <tr>
                                <th>Property Name</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Purchase Price</th>
                                <th>Category</th>
                                <th>Update Property Name</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                            <tr>
                                <td>{val.propertyname}</td>
                                <td>{val.city}</td>
                                <td>{val.state}</td>
                                <td>{val.purchaseprice}</td>
                                <td>{val.propertycategory}</td>
                                <td><input 
                                    type="text" 
                                    placeholder="New Name" 
                                    onChange={(event) => {
                                        setValues.newName(event.target.value);
                                    }} 
                                />
                                </td>
                                <td><button onClick={updatePropertyName(val.propertyid)}>Update Name</button></td>
                                <td><button onClick={()=>{deleteProperty(val.propertyid)}}>Delete Property</button></td>
                            </tr>
                        </table>
                    
                    </div>
                    )
                })}
            
            </div>
        </div>
    );
}

export default CitizenProfile;