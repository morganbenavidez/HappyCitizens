//importing necessary files
import Axios from "axios";
import React from "react";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";
import { useState } from "react";
import "./../Form.css";
import "./../FormInput.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import jsPDF from 'jspdf';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';




export function CitizenProfile() {

    //creating variables to store citizen user profiles

    var userid = localStorage.getItem("userid");
    var username = localStorage.getItem("username");
    var category = localStorage.getItem("category");
    var name = localStorage.getItem("name");
    var lastname = localStorage.getItem("lastname");
    var email = localStorage.getItem("email");
    var phone = localStorage.getItem("phone");
    


    //creating functions to use later for properties

    const [propertyname, setPropertyName] = useState('');
    const [propertyowner, setPropertyOwner] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [purchaseprice, setPurchasePrice] = useState('');
    const [propertycategory, setPropertyCategory] = useState('');
    const [propertyList, setPropertyList] = useState([]);
    const [propertyPrices, setPropertyPrices] = useState([]);
    const [propertyStatus, setPropertyStatus] = useState('');


    //creating functions to use for update calls

    const [newName, setNewName] = useState(0);


    //creating functions to use for searchbar and filtering by propertyname

    const [searchTerm, setSearchTerm] = useState('');
    const [addedUser, setAddedUser] = useState(''); 


    //function to validate data for adding properties before sending to backend 

    function validateData(){
        if (propertyname &&
            city &&
            state &&
            purchaseprice &&
            propertycategory){
                addProperty();

        }
    }


    //function to add property to citizen profile account

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
            //fetches properties again to refresh the list of properties
        getProperties();
        });
    };


    //function to calculate the networth of user logged in accoring to properties displayed on the page

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


    //function to display name of the property category

    const propertyCategoryName = (propertycategory) => {
        if(propertycategory == 1){
            return 'Land'
        } else if(propertycategory == 2){
            return 'Structure'
        } else if(propertycategory == 3){
            return 'Electronics'
        } else if(propertycategory == 4){
            return 'Jewelry'
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
    
    //function to get properties for the specific user on their page

    const getProperties = () => {
        Axios.get('http://localhost:3001/properties', { withCredentials: true }).then((response) => {
            if (response.data.success) {
                setPropertyList(response.data.properties);
                console.log(response);
            }
        });
    }


    //function to update name of property for the user on their page

    const updatePropertyName = (id) => {
        Axios.put(`http://localhost:3001/update/${id}`, {
          propertyname: newName, 
          propertyid: id,
        },{ withCredentials: true }).then((response) => {
          setPropertyList(propertyList.map((val) => {
            //after values get passed in for the update, the page gets updated to reflect the property with the new name
            return val.propertyid == id ? {propertyid: val.propertyid, propertyname: newName, 
              propertyowner: userid, city: val.city, state: val.state, 
              purchaseprice: val.purchaseprice, category: val.category} :val
          }))
        })
    }


    //function to delete properties from specific users property list

    const deleteProperty = (id) => {
        Axios.delete(`http://localhost:3001/delete/${id}`, { withCredentials: true }).then((response)=> {
          setPropertyList(propertyList.filter((val)=> {
            //after value gets passed in for delete, the page gets updated to show all properties that do not have the id of the property you deleted
            return val.propertyid != id
          }))
        });
    }


    //function to grant access for other user registered with the database

    const grantAccess = (username) => {
        Axios.post(`http://localhost:3001/grant/${username}`, {}, { withCredentials: true }).then((response) => {
            if (response.data.success) {
                console.log(response);
            }
        });
    }


    //function to download a pdf file of the properties list

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

    

    //return call building the page
    
    return (
        <div>
            <div className="App">
                <div className="information">
                    
                    {/*calling networth function to calculate all property costs together */}
                    
                    <p>Net Worth: ${netWorth()}</p>
                    <h3>{name} {lastname} - Citizen Profile</h3>
                    {/*buttons for printing and downloading pdf of property page/list*/}
                    <Button variant="dark" size="sm" id ="export" onClick={() => window.print()}>Print</Button>
                    <Button variant="dark" size="sm" id="export" onClick={exportPdf}>Download PDF</Button>


                    <form className = "formInput container-fluid">
                        <h3>Add a property</h3>
                        <label>
                            {/*input for adding property name using onchange event to store property name */}
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
                            {/*input for adding city name using onchange event to store city name*/}
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
                            {/*input for selecting state using onchange event to store state*/}
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
                            {/*input for adding purchase price using onchange event to store purchase price*/}
                            Purchase Price
                            <input 
                            type='number'
                            placeholder='Purchase Price'
                            onChange={(event) => {
                                setPurchasePrice(event.target.value)}} 
                            required="true"/>
                        </label>
                        <label>
                            {/*input for selecting property name using onchange event to store property category*/}
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
                        {/*button to call validate data function to make sure input is valid then adds property once it is valid*/}
                        <Button variant="dark" size="sm" onClick={validateData}>Add Property</Button>
                    </form>
                    <input
                        //onchange event to store username to use in grant access function
                            type='text'
                            placeholder='Username to Grant Access To'
                            onChange={event => {setAddedUser(event.target.value)}}
                            />
                        {/*button to call grant access function to allow other users to access properties*/}
                        <Button id="export" variant="dark" size="sm" onClick={()=>{grantAccess(addedUser)}}>Grant</Button>
                     {/*button to show property list*/}
                     <Button variant="dark" id="export" onClick={getProperties}>Show Properties</Button>
                    {/*input for searchbar*/}
                    <div className="searchBar">
                        <input type="text" placeholder="Search Property Name" onChange={event => {setSearchTerm(event.target.value)}} />
                    </div>
            <div id="myPage">
                    {/*lists out properties through a filter that is only used if search contains something inside
                    if searchbar is empty, then propertylist is mapped out normally*/}
                    {propertyList.filter((val)=>{
                        if (searchTerm == "") {
                            return val
                        } else if (val.propertyname.toLowerCase().includes(searchTerm.toLowerCase())){
                            return val
                        }
                    }).map((val, key) => {
                        return (
                    //table of property information
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
                                        {/*column allowing for user to update property using onchange event to store new name*/}
                                        <td><input 
                                            type="text" 
                                            placeholder="New Name" 
                                            onChange={(event) => {
                                                setNewName(event.target.value);
                                            }} 
                                        />
                                        </td>
                                        {/*buttons to call update or delete property functions*/}
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