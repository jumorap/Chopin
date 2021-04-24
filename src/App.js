import './App.css';
import Login from "./view/login";
import Testing from "./view/dbTest";
import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";


function App() {
  console.log("Inicio")
  //Materias.CreateMateria("Calculo 3")  
  //Archivos.crearArchivo("yW6HoVSQUox9hCXQU9wV","archivo de prueba de subida","Jahel Santiago","2022-2","anoasndiasdas","Parcial II")
  return (
      <Router>
          <Switch>
              <Route exact path="/">
                  <Login />
              </Route>
              <Route path="/test">
                  <Testing />
              </Route>
          </Switch>
      </Router>
  );
}

export default App;
