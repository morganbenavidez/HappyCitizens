import Axios from "axios";
import React from "react";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";
import { useState } from "react";
import "./../Form.css";
import "./../FormInput.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import jsPDF from 'jspdf';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';




export function CitizenProfile() {

    var userid = localStorage.getItem("userid");
    var username = localStorage.getItem("username");
    var category = localStorage.getItem("category");
    var name = localStorage.getItem("name");
    var lastname = localStorage.getItem("lastname");
    var email = localStorage.getItem("email");
    var phone = localStorage.getItem("phone");
    
    const [propertyname, setPropertyName] = useState('');
    const [propertyowner, setPropertyOwner] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [purchaseprice, setPurchasePrice] = useState('');
    const [propertycategory, setPropertyCategory] = useState('');
    const [propertyList, setPropertyList] = useState([]);

    const [propertyStatus, setPropertyStatus] = useState('');

    const [newName, setNewName] = useState(0);


    function validateData(){
        if (propertyname &&
            city &&
            state &&
            purchaseprice &&
            propertycategory){
                addProperty(); 

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

    const exportPdf = () => {

        htmlToImage.toPng(document.getElementById('myPage'), { quality: 0.95 })
        .then(function (dataUrl) {
          var link = document.createElement('a');
          link.download = 'my-image-name.jpeg';
          const pdf = new jsPDF();
          const imgProps= pdf.getImageProperties(dataUrl);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          pdf.addImage(dataUrl, 'PNG', 0, 0,pdfWidth, pdfHeight);
          pdf.save("propertiesPage.pdf"); 
        });
   
    }

    


    return (
        <div id="myPage" className="containter-fluid">
            <div className="App">
                <div className="information">
                    <button id ="export" onClick={() => window.print()}>Print</button>
                    <button id="export" onClick={exportPdf}>Download PDF</button>


                    <form class = "formInput container-fluid">
                        <h3>{name} {lastname} - Citizen Profile</h3>
                        <h3>Add a property</h3>
                        <label>
                            Property Name
                            <input 
                            type="text"
                            placeholder="Property Name" 
                            onChange={(event) => {
                                setPropertyName(event.target.value)
                            }}
                            required="true"/>
                        </label>
                        <label>
                            City
                            <input 
                            type='text'
                            placeholder='City'
                            onChange={(event) => {
                                setCity(event.target.value)
                            }}
                            required="true"/>
                        </label>
                        <label>
                            State
                            <select required="true" onChange={(e) => {setState(e.target.value);}}>
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
                                setPurchasePrice(event.target.value)}} 
                            required="true"/>
                        </label>
                        <label>
                            Category
                            <select required="true" onChange={(e) => {setPropertyCategory(e.target.value);}}>
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
                        <button onClick={validateData}>Add Property</button>
                        <input
                            type='number'
                            placeholder='Username to Grant Access To'
                            />
                        <button onClick={grantAccess}>Grant</button>
                        
                    </form>
                    
                
            <div>
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
            </div>
        </div>
    );
}

export default CitizenProfile;