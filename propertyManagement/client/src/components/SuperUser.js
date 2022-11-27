
import Axios from "axios";
import React from "react";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

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
            <Button variant="dark" size="sm" onClick={getProperties}>Show Properties</Button>
                    {propertyList.map((val, key) => {
                        return (
                        
                        <div>
                            <Table responsive="md" striped bordered hover variant="dark">
                                <thead>
                                    <tr className="container-fluid">
                                        <th className="col">Property Name</th>
                                        <th className="col">City</th>
                                        <th className="col">State</th>
                                        <th className="col">Purchase Price</th>
                                        <th className="col">Category</th>
                                        <th className="col">Update Property Name</th>
                                        <th className="col">Update</th>
                                        <th className="col">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="container-fluid">
                                        <td className="col">{val.propertyname}</td>
                                        <td className="col">{val.city}</td>
                                        <td className="col">{val.state}</td>
                                        <td className="col">{val.purchaseprice}</td>
                                        <td className="col">{val.category}</td>
                                        <td className="col"><input 
                                            type="text" 
                                            placeholder="New Name" 
                                            onChange={(event) => {
                                                setNewName(event.target.value);
                                            }} 
                                        />
                                        </td>
                                        <td className="col"><button onClick={()=>{updatePropertyName(val.propertyid)}}>Update</button></td>
                                        <td className="col"><button onClick={()=>{deleteProperty(val.propertyid)}}>Delete</button></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                        )
                    })}
            
            </div>
        </div>
    );
}

export default SuperUser;