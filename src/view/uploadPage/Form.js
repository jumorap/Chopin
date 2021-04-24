import React, { useState } from "react";
import DropDown from "./dropDown/DropDown";
import "./css/form.css";
const Form = () => {
  const [selectedTipo, setSelectedTipo] = useState(undefined);
  const [selectedSemestre, setSelectedSemestre] = useState(undefined);
  let select = (src) => src.target.innerHTML;
  /* SEMESTRES */
  /*<div className="semestres">
<div className="semestresRectangle"></div>
<h2 id="flush-headingThree">
  <div
    className="collapsed"
    data-bs-toggle="collapse"
    data-bs-target="#flush-collapseThree"
    aria-expanded="false"
    aria-controls="flush-collapseThree"
  >
    {selectedSemestre || "SEMESTRES"}
  </div>
</h2>
<div
  id="flush-collapseThree"
  className="accordion-collapse collapse"
  aria-labelledby="flush-headingThree"
  data-bs-parent="#accordionFlushExample"
>
  <div>{renderSemestres}</div>
</div>
</div>*/
  return (
    <div className="form">
      <DropDown
        selectedTipo={selectedTipo}
        title="TIPO"
        setSelectedTipo={setSelectedTipo}
        arr={[1, 2, 3, 4, 5]}
        select={select}
      />
      <DropDown
        selectedSemestre={selectedSemestre}
        setSelectedSemestre={setSelectedSemestre}
        title="SEMESTRE"
        arr={[1, 2, 3, 4, 5]}
        select={select}
      />
      <div className="profesor">
        <div className="profRectangle"></div>
        <input type="text" className="profText" Value="Nombre del profesor" />
      </div>
      <div className="materia">
        <div className="materiaRectangle"></div>
        <input type="text" className="materiaText" Value="Materia" />
      </div>
      <div className="recomendaciones">
        <div className="recomendacionesRectangle"></div>
        <h1 className="recomendacionesText">Recomendaciones</h1>
      </div>
    </div>
  );
};

export default Form;
