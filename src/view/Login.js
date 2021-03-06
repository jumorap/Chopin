import 'firebase/auth';
import withFirebaseAuth from "react-with-firebase-auth";
import { firebaseAppAuth, providers } from "../firebase/firebaseConfig";
import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faGoogle from '@fortawesome/fontawesome-free-brands/faGoogle';
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons/faSignOutAlt";
import "../css/login.css";
import principalNameLogo from "../assets/short-principal-slogan-logo.png";
import Searcher from "../components/SearchBar/Searcher";
import UploadFile from "../components/UploadFile/UploadFile";
import CookieConsent from "react-cookie-consent";
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from "react-router-dom";


class Login extends Component {
    render() {
        const {
            user,
            signOut,
            signInWithGoogle,
            toggleUploadFileModal
        } = this.props

        let isUnalUser

        if (user) isUnalUser = !!user.email.toString().split('@')[1].includes('unal.edu.co')

        const styles = {
            signOut: {
                background: 'linear-gradient(45deg, #525A6E 30%, #525A6E 90%)',
                color: '#FFF',
                borderRadius: 30,
                border: 0,
                padding: 0,
                width: "20px",                 
            },
            signIn: {
                background: 'linear-gradient(45deg, #FFF 30%, #FFF 90%)',
                borderRadius: 30,
                border: 0,
                padding: '0 20px',
            }
        }


        function logButtons(clickUse, funcStyle, classNameStyles, iconToUse, text, title="", containerClassName) {
            return (
                <div className = {containerClassName}>                
                    <Tooltip title = {title}>
                    <Button onClick={clickUse}
                        className={classNameStyles}
                        style={funcStyle}
                        startIcon={
                            <FontAwesomeIcon icon={iconToUse} />
                        }
                        aria-label="sign in and sign out"
                    >{text}</Button>
                    </Tooltip>
                </div>
            )
        }

        return (
            <>
            <div className={'div-general'}>
                <div className={'div-left'} >
                    <span className={"text-div-left"}>
                        ??Necesitas ayuda, encontraste un fallo, tienes sugerencias o te gustar??a ayudarnos a mejorar Red Board? Cont??ctanos: <a href={"mailto:redboardun@protonmail.com"}>redboardun@protonmail.com</a>
                        <p className={'link-privacy'}>
                            <Link to={`/legal`} className={'link-privacy'}>
                                T??rminos, Condiciones Y Pol??ticas de Privacidad
                            </Link>
                        </p>
                    </span>
                </div>
                <div className={'div-right'}>
                    <div className={'container-input-logo'}>                                                    
                            <img src={principalNameLogo} className={'slogan-img'} alt={'logo'} />
                            {
                                isUnalUser && user
                                    ? logButtons(signOut, styles.signOut, 'google-sign google-out', faSignOutAlt, '', "Sign Out", "signOut-container")
                                    : logButtons(signInWithGoogle, styles.signIn, 'google-sign', faGoogle, 'Sign in UNAL', "" ,"signIn-container")
                            }
                            {
                                !isUnalUser && user
                                    ? <p className={'non-unal-msg'}>Por ahora, solo se vincular??n cuentas <br/> institucionales UNAL</p>
                                    : <p />
                            }
                            {
                                isUnalUser && user
                                    ? <><Searcher /><UploadFile handleOpen={()=>toggleUploadFileModal(false)} /></>
                                    : <center>
                                        <span className={'legal'}>
                                            AL INGRESAR EST??S ACEPTANDO NUESTROS&nbsp;
                                            <Link to={`/legal`} className={'politics'}>
                                                T??RMINOS, CONDICIONES Y POL??TICAS DE PRIVACIDAD
                                            </Link>
                                        </span>
                                    </center>
                            }                        
                    </div>
                </div>
            </div>
        <CookieConsent
            location={"top"}
            buttonText={"Listo, parce"}
            declineButtonText={"Despu??s"}
            style={{}}
            expires={365}
            buttonStyle={{backgroundColor: "var(--redBoard)", color: "#FFF", padding: "8px 15px 8px 15px", borderRadius: "15px", fontWeight: 650,}}
        >
            Al navegar en este sitio aceptas la&nbsp;
            <Link to={`/legal#cookies`}>Pol??tica de Cookies</Link>
            &nbsp;usada para mejorar tu experiencia en el sitio web.

        </CookieConsent>
        </>
        );
    }
}

export default withFirebaseAuth({
    providers,
    firebaseAppAuth,
})(Login);
