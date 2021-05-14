import './App.css';
import Login from "./view/Login";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Admin from './view/Admin';
import { FilesByProgramme } from "./view/components/FilesByProgramme";
import Home from './view/Home';
import Materia from './view/Materia';
import ProgrammeResults from "./view/ProgrammeResults";
import { firebaseAppAuth } from "./model/firebaseSelf/firebaseConfig";
import { createContext, useEffect, useState } from 'react';
import Materias from './model/Materias';
import ContextProvider from './view/ContextProvider';

export const contextProvider = createContext()

function App() {
    var user = firebaseAppAuth.currentUser;
    let isUnalUser;
    if (user) isUnalUser = !!user.email.toString().split('@')[1].includes('unal.edu.co')
    //console.log(isUnalUser)

        

    
    function completeLogin() {
        return (
            <div className="App">
                <header className="App-header">
                    <Login/>
                </header>
            </div>
        )
    }

    if (false) {
        return (
            <Router>
                <main>
                    {completeLogin()}
                </main>
            </Router>
        )
    } else {
        return (            
            <ContextProvider>            
                <Router>
                    <Switch>
                        <Route exact path="/">
                            {completeLogin()}
                        </Route>
                        <Route path="/Admin">
                            <Admin/>
                        </Route>
                        <Route path="/home">
                            <Home/>
                        </Route>
                        <Route path="/pdfview">
                            <FilesByProgramme/>
                        </Route>
                        <Route exact path="/materias/:idMateria" component={ProgrammeResults}/>
                        <Route path="/results">
                            <ProgrammeResults/>
                        </Route>
                    </Switch>
                </Router>            
            </ContextProvider>
        )
    }
}

export default App;
