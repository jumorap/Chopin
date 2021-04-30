import './App.css';
import Login from "./view/Login";

import UploadFileView from "./view/updloadFileView";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { useEffect } from 'react';
import Admin from './view/Admin';

function App() {
            
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <div className="App">
                        <header className="App-header">
                            <Login/>
                        </header>
                    </div>
                </Route>
                <Route path="/uploadFile">
                    <UploadFileView/>
                </Route>
                <Route path="/Admin">
                    <Admin/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
