import './App.css';
import Login from "./view/Login";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Admin from './view/Admin';
import { FilesByProgramme } from "./view/components/FilesByProgramme";
import Home from './view/Home';
import Materia from './view/Materia';
import ProgrammeResults from "./view/ProgrammeResults";
import { firebaseAppAuth } from "./model/firebaseSelf/firebaseConfig";

function App() {
    var user = firebaseAppAuth.currentUser;
    let isUnalUser;
    if (user) isUnalUser = !!user.email.toString().split('@')[1].includes('unal.edu.co')
    console.log(isUnalUser)

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
                    <Route exact path="/materias/:idMateria" component={Materia}/>
                    <Route path="/results">
                        <ProgrammeResults/>
                    </Route>
                </Switch>
            </Router>
        )
    }
}

export default App;
