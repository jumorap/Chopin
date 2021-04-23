import './App.css';
import Login from "./view/login";
import Materias from "./model/Materias"
import FullTextSearch from "./Controler/FullTextSearch"

function App() {
  console.log("Inicio")
  //Materias.CreateMateria("Ingesoft")  
  //Archivos.crearArchivo("yW6HoVSQUox9hCXQU9wV","archivo de prueba de subida","Jahel Santiago","2022-2","anoasndiasdas","Parcial II")
  //console.log(Materias.getMateriasList(""))
  let data = new Map()    
  data.set("laisjbdsd33", "ingenieria de software 1")
  data.set("ljkasbd9223", "ingenieria de software 2")
  data.set("oiyoin123bo", "arquitectua de software")
  data.set("sadkjasbd22", "arquitectura de computadores")
  data.set("dadkjebd22", "arquitectura de computadores internos")
  data.set("noasidbasd2", "introduccion a la teoria de la computacion")
  

  let materiasSearch = new FullTextSearch(data)
  console.log(materiasSearch.queryData("i"))

  return (
    <div className="App">
      <header className="App-header">

        <Login />


      </header>
    </div>
  );
}

export default App;
