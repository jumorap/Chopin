import './App.css';
import Login from "./view/login";
import UploadFileView from "./view/updloadFileView";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Testing from "./view/testingView";


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
                <Route path="/testing">
                    <Testing/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
