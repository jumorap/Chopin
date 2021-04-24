import React from "react";
import './css/NBar.css';
import logo from '../../assets/react_logo.png'
import uicon from '../../assets/User.png'


const Navbar = () => {
  return (
    <div className = "contain">
    <button>

        <img src={logo}  style = {{ 
          position: "absolute",
          width: "303px",
          height: "auto",
          marginLeft: "10px",
          marginTop: "15px",
        }}
        onClick={""}
        />

      </button>
    
      <button>
        <img src={uicon}  style = {{ 
          position: "absolute",
          width: "200px",
          height: "auto",
          marginLeft: "1610px",
          marginTop: "0px",
          }}/>
        </button>
    </div>
  );
};

export default Navbar;
