import './App.css';
import Login from "./view/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Admin from './view/Admin';
import Home from './view/Home';
import ProgrammeResults from "./view/ProgrammeResults";
import { createContext } from 'react';
import ContextProvider from './view/ContextProvider';
import { AuthProvider } from "./model/firebaseAuthPersistence/AuthProvider";
import PrivateRoute from "./model/firebaseAuthPersistence/PrivateRoute";


export const contextProvider = createContext(undefined)

function App() {

    return (
        <Router>
            <AuthProvider>
            <ContextProvider>
                
                <Switch>
                            <PrivateRoute exact path="/materias/:idMateria" component={ ProgrammeResults} />
                            <PrivateRoute exact path="/results" component={ProgrammeResults} />
                            <PrivateRoute exact path="/admin" component={Admin} />
                            <PrivateRoute exact path="/home" component={Home} />
                            <Route exact path="/" component={Login} />
                </Switch>
                
            </ContextProvider>
            </AuthProvider>
        </Router>
    )
}

export default App;
