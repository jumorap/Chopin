import 'firebase/auth';
import withFirebaseAuth from "react-with-firebase-auth";
import {firebaseAppAuth, providers} from "../model/firebaseConfig";
import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faGoogle from '@fortawesome/fontawesome-free-brands/faGoogle';

class Login extends Component {
    render() {
        const {
            user,
            signOut,
            signInWithGoogle,
        } = this.props;
        return (
            <div>
                {
                    user
                        ? <p>Hello, {user.displayName}</p>
                        : <p>Please, sign in</p>
                }
                {
                    user
                        ? <Button onClick={signOut}
                                  variant="contained"
                                  color="primary"
                                  size="large"
                                  startIcon={<FontAwesomeIcon icon={faGoogle} />}>Sign out</Button>
                        : <Button onClick={signInWithGoogle}
                                  variant="contained"
                                  color="primary"
                                  size="large"
                                  startIcon={<FontAwesomeIcon icon={faGoogle} />}>Sign in with Google</Button>
                }
            </div>
        );
    }
}

export default withFirebaseAuth({
    providers,
    firebaseAppAuth,
})(Login);
