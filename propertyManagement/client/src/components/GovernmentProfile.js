//imports

import Axios from "axios";
import React from "react";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import jsPDF from 'jspdf';
import * as htmlToImage from 'html-to-image';



function GovernmentProfile() {
    
    //creating variables to store government user profiles
    var userid = localStorage.getItem("userid");
    var name = localStorage.getItem("name");
    var lastname = localStorage.getItem("lastname");

    //creating functions to use later for properties
    const [propertyname, setPropertyName] = useState('');
    const [propertyowner, setPropertyOwner] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [purchaseprice, setPurchasePrice] = useState('');
    const [propertycategory, setPropertyCategory] = useState('');
    const [propertyStatus, setPropertyStatus] = useState('');
    const [propertyList, setPropertyList] = useState([]);

    //creating functions to use for searchbar and filtering by propertyname
    const [searchTerm, setSearchTerm] = useState('');

    //function to get all properties and display them on the government page
    const getProperties = () => {
        Axios.get('http://localhost:3001/allproperties', { withCredentials: true }).then((response) => {
            if (response.data.success) {
                setPropertyList(response.data.properties);
                console.log(response.data.properties); 
                console.log(response);
            }
        });
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

    //function to get download a pdf file of the property list
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
                <h3>{name} {lastname} - Government Profile</h3>
                    <div className="information">

                        {/* buttons to print page, download a pdf of the page, and to show the properties*/}

                        <Button  id="export" variant="dark" onClick={() => window.print()}>Print</Button>
                        <Button id ="export" variant="dark" onClick={exportPdf}>Download PDF</Button>
                        <Button variant="dark" id="export" onClick={getProperties}>Show Properties</Button>

                        {/* searchbar with onchange event to search through property list */}

                        <div className="searchBar">
                        <input type="text" placeholder="Search Property Name" onChange={event => {setSearchTerm(event.target.value)}} />
                        </div>
                    </div>
                    {/*lists out properties through a filter that is only used if search contains something inside
                    if searchbar is empty, then propertylist is mapped out normally */}
                        {propertyList.filter((val)=>{
                        if (searchTerm == "") {
                            return val
                        } else if (val.propertyname.toLowerCase().includes(searchTerm.toLowerCase())){
                            return val
                        }
                    }).map((val, key) => {
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
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{val.propertyname}</td>
                                                <td>{val.city}</td>
                                                <td>{val.state}</td>
                                                <td>{val.purchaseprice}</td>
                                                <td>{propertyCategoryName(val.category)}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                                )
                            })}
                    </div>
                </div>
    </div>
    );
}

export default GovernmentProfile;