//imports
import Axios from "axios";
import React from "react";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import jsPDF from 'jspdf';
import * as htmlToImage from 'html-to-image';

export function SuperUser() {
    
    //creating variables to store super user profiles
    var userid = localStorage.getItem("userid");
    var name = localStorage.getItem("name");
    var lastname = localStorage.getItem("lastname");


    //creating functions to use later for updating, searching, and displaying properties

    const [newName, setNewName] = useState(0);
    const [propertycategory, setPropertyCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [propertyList, setPropertyList] = useState([]);


    //creating function to display all properties

    const getProperties = () => {
        Axios.get('http://localhost:3001/allproperties', { withCredentials: true }).then((response) => {
            if (response.data.success) {
                setPropertyList(response.data.properties);
                console.log(response.data.properties);
                console.log(response);
            }
        });
    }


    //function to update property name

    const updatePropertyName = (id) => {
        Axios.put(`http://localhost:3001/update/${id}`, {
          propertyname: newName, 
          propertyid: id,
        },{ withCredentials: true }).then((response) => {
          setPropertyList(propertyList.map((val) => {
            //after values get passed in for update, page gets updated to reflect new property name
            return val.propertyid == id ? {propertyid: val.propertyid, propertyname: newName, 
              propertyowner: userid, city: val.city, state: val.state, 
              purchaseprice: val.purchaseprice, category: val.category} :val
          }))
        })
    }


    //function to delete property from account

    const deleteProperty = (id) => {
        Axios.delete(`http://localhost:3001/delete/${id}`,{ withCredentials: true }).then((response)=> {
          setPropertyList(propertyList.filter((val)=> {
            //after values get passed for delete, page shows all properties with id not equal to deleted property
            return val.propertyid != id
          }))
        });
    }

    
    //function to download pdf file

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


    //function to get display name of property category

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


    //return call building the page

    return (
        <div id="myPage">
            <div className="App">
            <div className="information">
                <h3>{name} {lastname} - Super User</h3>
                <div className="information">

                     {/* buttons to print page, download a pdf of the page, and to show the properties*/}

                    <Button variant="dark" id="export" onClick={() => window.print()}>Print</Button>
                    <Button variant="dark" id="export" onClick={exportPdf}>Download PDF</Button>
                    <Button variant="dark" id="export" onClick={getProperties}>Show Properties</Button>
                   
                    {/*search bar input */}

                    <div className="searchBar">
                        <input type="text" placeholder="Search Property Name" onChange={event => {setSearchTerm(event.target.value)}} />
                    </div>
                </div>
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
    );
}

export default SuperUser;