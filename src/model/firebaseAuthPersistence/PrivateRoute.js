import React, { useContext, useEffect } from "react"
import { Route, Redirect } from "react-router-dom"
import { AuthContext } from "./AuthProvider"
import { firebaseAnalytics, firebaseAppAuth } from "../firebaseSelf/firebaseConfig"


const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
    const {currentUser} = useContext(AuthContext)

    var user = firebaseAppAuth.currentUser
    let isUnalUser
    if (user) isUnalUser = !!user.email.toString().split('@')[1].includes('unal.edu.co')

    /*Google analytics*/
    useEffect(() => {
        if (!isUnalUser) firebaseAnalytics.logEvent(`UnalUser_false`)
        else if (isUnalUser) firebaseAnalytics.logEvent(`UnalUser_true`)
    })

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

