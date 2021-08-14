import 'firebase/auth';
import withFirebaseAuth from "react-with-firebase-auth";
import { firebaseAppAuth, providers } from "../model/firebaseSelf/firebaseConfig";
import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faGoogle from '@fortawesome/fontawesome-free-brands/faGoogle';
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons/faSignOutAlt";
import "./css/login.css";
import principalNameLogo from "./assets/principal-slogan-logo.png";
import Searcher from "./components/Searcher";
import UploadFile from "./UploadFile/UploadFile";
import CookieConsent from "react-cookie-consent";
import Tooltip from '@material-ui/core/Tooltip';

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
                position: "absolute",
                bottom : "33px"
            },
            signIn: {
                background: 'linear-gradient(45deg, #FFF 30%, #FFF 90%)',
                borderRadius: 30,
                border: 0,
                padding: '0 20px',
            }
        }


        function logButtons(clickUse, funcStyle, classNameStyles, iconToUse, text, title="") {
            return (
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
            )
        }

        return (
            <>
            <div className={'div-general'}>
                <div className={'div-left'} >
                    <span className={"text-div-left"}>
                        ¿Necesitas ayuda, encontraste un fallo, tienes sugerencias o te gustaría ayudarnos a mejorar Red Board? Contáctanos: <a href={"mailto:redboardunal@protonmail.com"}>redboardunal@protonmail.com</a>
                    </span>
                </div>
                <div className={'div-right'}>
                    <div className={'container-input-logo'}>                        
                            <img src={principalNameLogo} className={'slogan-img'} alt={'logo'} />

                            {
                                isUnalUser && user
                                    ? logButtons(signOut, styles.signOut, 'google-sign google-out', faSignOutAlt, '', "Sign Out")
                                    : logButtons(signInWithGoogle, styles.signIn, 'google-sign', faGoogle, 'Sign in UNAL', )
                            }
                            {
                                !isUnalUser && user
                                    ? <p className={'non-unal-msg'}>Por ahora, solo se vincularán cuentas institucionales UNAL</p>
                                    : <p />
                            }
                            {
                                isUnalUser && user
                                    ? <><Searcher /><UploadFile handleOpen={toggleUploadFileModal} /></>
                                    : <center>
                                        <span className={'legal'}>
                                            AL INGRESAR ESTÁS ACEPTANDO NUESTROS
                                            <a className={'politics'} href={'https://www.github.com'} target={"_blank"} rel="noreferrer">
                                                TÉRMINOS, CONDICIONES Y POLÍTICAS DE PRIVACIDAD
                                            </a>
                                        </span>
                                    </center>
                            }                        
                    </div>
                </div>
            </div>
        <CookieConsent
            location={"top"}
            buttonText={"Listo, parce"}
            declineButtonText={"Después"}
            style={{}}
            expires={365}
            buttonStyle={{backgroundColor: "rgb(170, 0, 0)", color: "#FFF", padding: "8px 15px 8px 15px", borderRadius: "15px", fontWeight: 700,}}
        >
            Al navegar en este sitio aceptas las cookies que utilizamos para mejorar tu experiencia
        </CookieConsent>
        </>
        );
    }
}

export default withFirebaseAuth({
    providers,
    firebaseAppAuth,
})(Login);
