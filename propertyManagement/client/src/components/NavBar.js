import React from "react";
import {Navbar, Nav, Container} from 'react-bootstrap';
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <div className='navigationMenu'>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container fluid>
                {/**Set up the name of the nav bar */}
                <Navbar.Brand><h1>Happy Citizen Property Management</h1></Navbar.Brand>
                
                <Navbar.Collapse id="navbarScroll">
                <Nav 
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    <div className="innerNavigationMenu">
                    <div className="navigationMenuItem">
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    </div>
                    <div className="navigationMenuItem">
                        <Nav.Link as={Link} to="/register">Create Account</Nav.Link>
                    </div>
                    
                    </div>
                </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}


/* <Navbar.Toggle aria-controls="navbarScroll" /> */
export default NavBar;

/*
<div className="navigationMenuItem">
                        <Nav.Link as={Link} to="/citizenprofile">Citizen Profile</Nav.Link>
                    </div>
*/