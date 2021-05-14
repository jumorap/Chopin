import React, { useContext } from "react"
import { Route, Redirect } from "react-router-dom"
import { AuthContext } from "./AuthProvider"
import { firebaseAppAuth } from "../firebaseSelf/firebaseConfig";


const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
    const {currentUser} = useContext(AuthContext);

    var user = firebaseAppAuth.currentUser;
    let isUnalUser;
    if (user) isUnalUser = !!user.email.toString().split('@')[1].includes('unal.edu.co')

    return (
        <Route
            {...rest}
            render={routeProps =>
                !!currentUser && isUnalUser ? (
                    <RouteComponent {...routeProps} />
                ) : (
                    <Redirect to={"/"} />
                )
            }
        />
    );
};


export default PrivateRoute

