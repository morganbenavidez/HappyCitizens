import Axios from "axios";
import React from "react";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import jsPDF from 'jspdf';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';


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
        <div id="myPage" className="App">
            <div className="information">
            <button id ="export" onClick={() => window.print()}>Print</button>
                    <button id="export" onClick={exportPdf}>Download PDF</button>

                <div className="givemesomeroomtobreathe">
                    <h2>{name} {lastname} - Government Profile</h2>
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
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="container-fluid">
                                        <td className="col">{val.propertyname}</td>
                                        <td className="col">{val.city}</td>
                                        <td className="col">{val.state}</td>
                                        <td className="col">{val.purchaseprice}</td>
                                        <td className="col">{val.category}</td>
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