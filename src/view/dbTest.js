import React from "react";
import Materias from "../model/materias";
import Archivos from "../model/Archivos";

function Testing() {
  //Materias.CreateMateria("testing1")
  //Materias.getIdMateria("testing1")
  let file = new File("../assets/files/uml.pdf");
  Archivos.crearArchivo(
    "0uP9nghHFV28a257WK5k",
    "parcial",
    "pepe",
    2,
    "11",
    "categorias",
    file
  );
  //Archivos.crearArchivo(id_materia, descripcion, profesor, semestre, id_usuario, categorias, file)
  return (
    <div>
      <h2>Testing</h2>
    </div>
  );
}

export default Testing;
