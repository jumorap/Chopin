import React from 'react'
import Searcher from './Searcher'
import '../css/generalNav.css'
import logo from '../assets/principal-logo.png'

function NavBar() {
    return (
            <nav className="Main-navbar"> 
                    <img src={logo} className = "responsive" />
                    <Searcher/>     
            </nav>
    )
}

export default NavBar
