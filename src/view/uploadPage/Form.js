import React, { useState } from "react";
import DropDown from "./dropDown/DropDown";
import "./css/form.css";
const Form = () => {
  const [selectedTipo, setSelectedTipo] = useState(undefined);
  const [selectedSemestre, setSelectedSemestre] = useState(undefined);
  let select = (src) => src.target.innerHTML;
  return (
    <div className="form col-4 col-md-12 border">
      <DropDown
        selected={selectedTipo}
        title="TIPO"
        setSelected={setSelectedTipo}
        arr={["Parcial", "Notas de clase", "Taller"]}
        select={select}
      />
      <DropDown
        selected={selectedSemestre}
        setSelected={setSelectedSemestre}
        title="SEMESTRE"
        arr={[1, 2, 3, 4, 5]}
        select={select}
      />
      <div className="block">
        <input
          type="text"
          className="blockText ul"
          Value="Nombre del profesor"
        />
      </div>
      <div className="block">
        <input type="text" className="blockText ul" Value="Materia" />
      </div>
      <div className="block">
        <h1 className="blockText">Recomendaciones</h1>
      </div>
      <div className="block subir">
        <h1 className="blockText">Subir</h1>
      </div>
    </div>
  );
};

export default Form;
