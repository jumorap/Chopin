import './App.css';
import Login from "./view/Login";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Admin from './view/Admin';
import ProgrammeResults from "./view/ProgrammeResults";
import { createContext, useEffect } from 'react';
import ContextProvider from './view/ContextProvider';
import { AuthProvider } from "./model/firebaseAuthPersistence/AuthProvider";
import PrivateRoute from "./model/firebaseAuthPersistence/PrivateRoute";
import { firebaseAnalytics } from "./model/firebaseSelf/firebaseConfig";


export const contextProvider = createContext(undefined)

function App() {

    /*Google analytics*/
    useEffect(() => {
        firebaseAnalytics.logEvent("homepage_visited")
    })

    return (
        <Router>
            <AuthProvider>
                <ContextProvider>
                    <PrivateRoute exact path="/materias/:idMateria" component={ ProgrammeResults} />
                    <PrivateRoute exact path="/results" component={ProgrammeResults} />
                    <PrivateRoute exact path="/admin" component={Admin} />

                    <Route exact path="/" component={Login} />
                </ContextProvider>
            </AuthProvider>
        </Router>
    )
}

export default App;
