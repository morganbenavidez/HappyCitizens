import Axios from "axios";
import React from "react";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import jsPDF from 'jspdf';
import * as htmlToImage from 'html-to-image';


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
                <h3>{name} {lastname} - Government Profile</h3>
                </div>
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
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{val.propertyname}</td>
                                                <td>{val.city}</td>
                                                <td>{val.state}</td>
                                                <td>{val.purchaseprice}</td>
                                                <td>{val.category}</td>
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

export default GovernmentProfile;