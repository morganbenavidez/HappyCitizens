import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import CitizenProfile from './components/CitizenProfile';
import GovernmentProfile from './components/GovernmentProfile';
import SuperUser from './components/SuperUser';


function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<CreateAccount/>} />  
        <Route path="/citizenprofile" element={<CitizenProfile/>} /> 
        <Route path="/governmentprofile" element={<GovernmentProfile/>} /> 
        <Route path="/superuserprofile" element={<SuperUser/>} />     
      </Routes>
    </BrowserRouter>

  );
}

export default App;
