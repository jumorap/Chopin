import './App.css';
import Login from "./view/login";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Admin from './view/admin';
import { FilesByProgramme } from "./view/filesByProgramme";


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
                <Route path="/Admin">
                    <Admin/>
                </Route>
                <Route path="/pdfview">
                    <FilesByProgramme/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
