import logo from './logo.svg';
import './App.css';
import Materias from "./model/Materias"
import Archivos from "./model/Archivos"

function App() {
  console.log("Inicio")
  //Materias.CreateMateria("Calculo 3")  
  //Archivos.crearArchivo("yW6HoVSQUox9hCXQU9wV","archivo de prueba de subida","Jahel Santiago","2022-2","anoasndiasdas","Parcial II")
  return (
    <div className="App">
      <header className="App-header">        

        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
