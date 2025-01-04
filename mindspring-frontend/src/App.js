// src/App.js
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import UpperToolbar from "./components/UpperToolbar";
import Navbar from "./components/Navbar"; 

const App = () => {
  return (
    <Router>
      <UpperToolbar />
      <Navbar /> 
    </Router>
  );
};

export default App;