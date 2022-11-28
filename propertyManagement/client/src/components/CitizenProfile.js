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
    const [propertyPrices, setPropertyPrices] = useState([]);

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

    const netWorth = () => {
        var sum = 0; 
        propertyList.forEach(function (item, index) {
            sum += item.purchaseprice})
        if (sum > 0){
            return sum; 
        }
        else{
            return "(Press 'Show Properties' at the bottom to view net worth)"
        }
    }

    const propertyCategoryName = (propertycategory) => {
        if(propertycategory == 1){
            return 'Land'
        } else if(propertycategory == 2){
            return 'Structure'
        } else if(propertycategory == 3){
            return 'Electronics'
        } else if(propertycategory == 4){
            return 'Jewlery'
        } else if(propertycategory == 5){
            return 'Single-Family Home'
        } else if(propertycategory == 6){
            return 'Multi-Family Home'
        } else if(propertycategory == 7){
            return 'Vehicle'
        } else if(propertycategory == 8){
            return 'Boat'
        }
    }
    
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
        },{ withCredentials: true }).then((response) => {
          setPropertyList(propertyList.map((val) => {
            return val.propertyid == id ? {propertyid: val.propertyid, propertyname: newName, 
              propertyowner: userid, city: val.city, state: val.state, 
              purchaseprice: val.purchaseprice, propertycategory: val.propertycategory} :val
          }))
        })
    }

    const deleteProperty = (id) => {
        Axios.delete(`http://localhost:3001/delete/${id}`, { withCredentials: true }).then((response)=> {
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
        <div id="myPage">
            <div className="App">
                <div className="information">
                    <p>Net Worth: ${netWorth()}</p>
                    <h3>{name} {lastname} - Citizen Profile</h3>
                    <Button variant="dark" size="sm" id ="export" onClick={() => window.print()}>Print</Button>
                    <Button variant="dark" size="sm" id="export" onClick={exportPdf}>Download PDF</Button>


                    <form className = "formInput container-fluid">
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
                        <Button variant="dark" size="sm" onClick={validateData}>Add Property</Button>
                    </form>
                    <input
                            type='number'
                            placeholder='Username to Grant Access To'
                            />
                    <Button id="export" variant="dark" size="sm" onClick={grantAccess}>Grant</Button>
                    
                
            <div>
                    <Button variant="dark" size="sm" onClick={getProperties}>Show Properties</Button>
                    {propertyList.map((val, key) => {
                        return (
                        
                        <div>
                            <Table responsive="md" striped bordered hover variant="dark">
                                <thead>
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
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{val.propertyname}</td>
                                        <td>{val.city}</td>
                                        <td>{val.state}</td>
                                        <td>{val.purchaseprice}</td>
                                        <td>{propertyCategoryName(val.category)}</td>
                                        <td><input 
                                            type="text" 
                                            placeholder="New Name" 
                                            onChange={(event) => {
                                                setNewName(event.target.value);
                                            }} 
                                        />
                                        </td>
                                        <td><Button variant="dark" size="sm" onClick={()=>{updatePropertyName(val.propertyid)}}>Update</Button></td>
                                        <td><Button variant="dark" size="sm" onClick={()=>{deleteProperty(val.propertyid)}}>Delete</Button></td>
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