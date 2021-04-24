import './App.css';
import Login from "./view/login";
import testSomething from "./testing/testSomething";
import UploadFileView from "./view/updloadFileView";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


function App() {


    testSomething(); //In this function you test your new features

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
            </Switch>

        </Router>
    );
}

export default App;
