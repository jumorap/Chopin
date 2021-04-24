import "firebase/auth";
import withFirebaseAuth from "react-with-firebase-auth";
import { firebaseAppAuth, providers } from "../model/firebaseConfig";
import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faGoogle from "@fortawesome/fontawesome-free-brands/faGoogle";
import "../css/login.css";
import principalNameLogo from "../assets/principal-slogan-logo.png";

class Login extends Component {
  render() {
    const { user, signOut, signInWithGoogle } = this.props;
    return (
      <div className={"div-general"}>
        <div className={["div-left", "div-half-screen"].join(" ")} />
        <div className={["div-right", "div-half-screen"].join(" ")}>
          <div className={"container-div-right"}>
            {user ? (
              <p>Hello, {user.displayName}</p>
            ) : (
              <p>
                <img
                  src={principalNameLogo}
                  className={"slogan-img"}
                  alt={"logo"}
                />
              </p>
            )}
            {user ? (
              <Button
                onClick={signOut}
                variant="contained"
                color="primary"
                size="large"
                startIcon={<FontAwesomeIcon icon={faGoogle} />}
              >
                Sign out
              </Button>
            ) : (
              <Button
                onClick={signInWithGoogle}
                className={"google-sign"}
                style={{
                  background: "linear-gradient(45deg, #FFF 30%, #FFF 90%)",
                  borderRadius: 30,
                  border: 0,
                  color: "#000",
                  height: 48,
                  padding: "0 30px",
                  boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)",
                }}
                variant="contained"
                color="primary"
                size="large"
                startIcon={<FontAwesomeIcon icon={faGoogle} />}
              >
                Sign in with Google
              </Button>
            )}
            {user ? (
              <hr />
            ) : (
              <center>
                <span className={"legal"}>
                  AL INGRESAR ESTÁS ACEPTANDO NUESTROS
                  <a className={"politics"} href={"https://www.github.com"}>
                    TÉRMINOS, CONDICIONES Y POLÍTICAS DE PRIVACIDAD
                  </a>
                </span>
              </center>
            )}
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
