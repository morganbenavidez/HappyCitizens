

import Axios from "axios";
import React from "react";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";
import { useState } from "react";
export function SuperUser() {
    
    var userid = localStorage.getItem("userid");
    var name = localStorage.getItem("name");
    var lastname = localStorage.getItem("lastname");

    const [newName, setNewName] = useState(0);
    const [propertycategory, setPropertyCategory] = useState('');

    const [propertyList, setPropertyList] = useState([]);

    const getProperties = () => {
        Axios.get('http://localhost:3001/allproperties', { withCredentials: true }).then((response) => {
            if (response.data.success) {
                setPropertyList(response.data.properties);
                console.log(response.data.properties);
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


    return (
        <div className="App">
            <div className="information">
                <div className="givemesomeroomtobreathe">
                    <h2>{name} {lastname} - Super User</h2>
                </div>
            </div>
            <div className="properties">
                <button onClick={getProperties}>Show Properties</button>
                {propertyList.map((val, key) => {
                    return (
                    <div className="propertyName">
                        <div>
                            <h3>Property Name: {val.propertyname}</h3>
                            <h3>City: {val.city}</h3>
                            <h3>State: {val.state}</h3>
                            <h3>Purchase Price: {val.purchaseprice}</h3>
                            <h3>Category: {val.propertycategory}</h3>
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
                        <button onClick={()=>{updatePropertyName(val.propertyid)}}>Update Name</button>
                        <button onClick={()=>{deleteProperty(val.propertyid)}}>Delete Property</button>
                        </div>
                    </div>
                    )
                })}
            
            </div>
        </div>
    );
}

export default SuperUser;