import Axios from "axios";
import React from "react";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";
import { useState } from "react";
function GovernmentProfile() {
    
    
    var userid = localStorage.getItem("userid");
    var name = localStorage.getItem("name");
    var lastname = localStorage.getItem("lastname");

    const [propertyname, setPropertyName] = useState('');
    const [propertyowner, setPropertyOwner] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [purchaseprice, setPurchasePrice] = useState('');
    const [propertycategory, setPropertyCategory] = useState('');

    const [propertyStatus, setPropertyStatus] = useState('');

    const [newName, setNewName] = useState(0);

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

    return (
        <div className="App">
            <div className="information">
                <div className="givemesomeroomtobreathe">
                    <h2>{name} {lastname} - Government Profile</h2>
                </div>
            </div>
        
            <div className="properties">
                <button onClick={getProperties}>Show Properties</button>
                {propertyList.map((val, key) => {
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
                            </tr>
                        </table>
                    </div>
                    )
                })}
            
            </div>
        </div>
    );
}

export default GovernmentProfile;