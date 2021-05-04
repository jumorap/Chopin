import 'firebase/auth';
import withFirebaseAuth from "react-with-firebase-auth";
import {firebaseAppAuth, providers} from "../Model/Firebase/firebaseConfig";
import React, { Component, useState } from "react";
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faGoogle from '@fortawesome/fontawesome-free-brands/faGoogle';
import "./css/login.css";
import principalNameLogo from "./assets/principal-slogan-logo.png";

var isUnalUser;

class Login extends Component {
    render() {
        const {
            user,
            signOut,
            signInWithGoogle,
        } = this.props;                

        if (user) isUnalUser = !!user.email.toString().includes('unal.edu.co')

        return (
            <div className={'div-general'}>
                <div className={['div-left', 'div-half-screen'].join(' ')} />
                <div className={['div-right', 'div-half-screen'].join(' ')}>
                    <div className={'container-div-right'}>

                        {
                            isUnalUser && user
                                ? <p>Hello, {user.displayName} {user.email}</p>
                                : <p><img src={principalNameLogo} className={'slogan-img'} alt={'logo'}/></p>
                        }
                        {
                            isUnalUser && user
                                ? <Button onClick={signOut}
                                          className={'google-sign'}
                                          style={{
                                              background: 'linear-gradient(45deg, #525A6E 30%, #525A6E 90%)',
                                              color: '#FFF',
                                              borderRadius: 30,
                                              border: 0,
                                              padding: '0 30px',
                                          }}
                                          startIcon={
                                              <FontAwesomeIcon icon={faGoogle} />
                                          }>Sign out</Button>
                                : <Button onClick={signInWithGoogle}
                                          className={'google-sign'}
                                          style={{
                                              background: 'linear-gradient(45deg, #FFF 30%, #FFF 90%)',
                                              borderRadius: 30,
                                              border: 0,
                                              padding: '0 30px',
                                          }}
                                          startIcon={
                                              <FontAwesomeIcon icon={faGoogle} />
                                          }>Sign in UNAL</Button>
                        }
                        {
                            !isUnalUser && user
                                ? <p className={'non-unal-msg'}>Por ahora, solo se vincularán cuentas institucionales UNAL</p>
                                : <p />
                        }
                        {
                            isUnalUser && user
                                ? <p />
                                : <center>
                                    <span className={'legal'}>
                                        AL INGRESAR ESTÁS ACEPTANDO NUESTROS
                                        <a className={'politics'} href={'https://www.github.com'} target={"_blank"}>
                                            TÉRMINOS, CONDICIONES Y POLÍTICAS DE PRIVACIDAD
                                        </a>
                                    </span>
                                </center>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default withFirebaseAuth({
    providers,
    firebaseAppAuth,
})(Login);
