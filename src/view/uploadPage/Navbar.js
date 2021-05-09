import { colors } from "@material-ui/core";
import React, { useState } from "react";
import logo from '../../assets/react_logo.png';
import './css/NBar.css';
import Boton from './NavBar/SimpleMenu';


const Navbar = () => {
  return (
  <nav>
          <img src ={logo} className = 'responsive'/>


      <div className = "rightSide">
         <Boton /> 
      </div>

    </nav>

        
 
  );
};

export default Navbar;
