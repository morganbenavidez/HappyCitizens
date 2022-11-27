
import Axios from "axios";
import React from "react";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import jsPDF from 'jspdf';
import * as htmlToImage from 'html-to-image';

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


    return (
        <div id="myPage">
            <div className="App">
            <div className="information">
                <h3>{name} {lastname} - Super User</h3>
                <div>
                    <Button  variant="dark" onClick={() => window.print()}>Print</Button>
                    <Button variant="dark" onClick={exportPdf}>Download PDF</Button>
                    <Button variant="dark" onClick={getProperties}>Show Properties</Button>
                </div>
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
                                        <td><button onClick={()=>{updatePropertyName(val.propertyid)}}>Update</button></td>
                                        <td><button onClick={()=>{deleteProperty(val.propertyid)}}>Delete</button></td>
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