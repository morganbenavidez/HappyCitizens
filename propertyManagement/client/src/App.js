import './App.css';
 import React from 'react'; 
 import {Navbar, Nav, Container} from 'react-bootstrap'
 import 'bootstrap/dist/css/bootstrap.min.css';
 import {
   BrowserRouter,
   Routes,
   Route,
   Link
 } from "react-router-dom";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import CitizenProfile from './components/CitizenProfile';
import GovernmentProfile from './components/GovernmentProfile';
import SuperUser from './components/SuperUser';
import CreateAccountForm from './components/CreateAccountForm';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
         <>
         {/**Create a callapsable navbar */}
           <Navbar bg="dark" variant="dark" expand="lg">
             <Container fluid>
               {/**Set up the name of the nav bar */}
             <Navbar.Brand>Property Management</Navbar.Brand>
             <Navbar.Toggle aria-controls="navbarScroll" />
             <Navbar.Collapse id="navbarScroll">
               <Nav 
                   className="me-auto my-2 my-lg-0"
                   style={{ maxHeight: '100px' }}
                   navbarScroll
               >
                 <Nav.Link as={Link} to="/login">Login</Nav.Link>
                 <Nav.Link as={Link} to="/register">Register</Nav.Link>
               </Nav>
             </Navbar.Collapse>
             </Container>
           </Navbar>
         </>
 
        </div>

      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<CreateAccountForm/>} />  
        <Route path="/citizenprofile" element={<CitizenProfile/>} /> 
        <Route path="/governmentprofile" element={<GovernmentProfile/>} /> 
        <Route path="/superuserprofile" element={<SuperUser/>} />     
      </Routes>
    </BrowserRouter>

  );
}

export default App;

