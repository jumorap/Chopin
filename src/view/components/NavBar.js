import React from 'react'
import Searcher from './Searcher'
import '../css/navBar.css'
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons/faSignOutAlt";
import logo from '../assets/principal-logo.png'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function NavBar() {
    return (
        <nav className={"main-navbar"}>

            <Link to="/">
                <div className={"logo-container-nav"}>
                    <center>
                        <input className={"logo-image"} type="image" src={logo} alt={""}/>
                    </center>
                </div>
            </Link>

            <div className={"searcher-container-nav"}>
                <Searcher />
            </div>

            <div className={"log-out-container-nav"}>
                <FontAwesomeIcon icon={faSignOutAlt}
                                 className={"sign-out"}/>
            </div>
        </nav>
    )
}

export default NavBar
