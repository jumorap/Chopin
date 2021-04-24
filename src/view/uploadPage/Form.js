import React, { useState } from "react";
import DropDown from "./dropDown/DropDown";
import subir from "../../assets/subir.png";
import "./css/form.css";
const Form = () => {
  const [selectedTipo, setSelectedTipo] = useState(undefined);
  const [selectedSemestre, setSelectedSemestre] = useState(undefined);

  const validateData = (data) => {
    console.log(`selectedTipo`, data.tipo);
    console.log(`selectedSemestre`, data.semestre);
    console.log(`profesor`, data.profesor);
    console.log(`materia`, data.materia);
    console.log(`recomendaciones`, data.recomendaciones);
  };

  const clear = () => {
    setSelectedTipo(undefined);
    setSelectedSemestre(undefined);
    document.getElementById("upload_profesor").value = "";
    document.getElementById("upload_materia").value = "";
    document.getElementById("upload_recomendaciones").value = "";
  };

  const handleSubmit = () => {
    const datos = {
      tipo: selectedTipo,
      semestre: selectedSemestre,
      profesor: document.getElementById("upload_profesor").value,
      materia: document.getElementById("upload_materia").value,
      recomendaciones: document.getElementById("upload_recomendaciones").value,
    };
    validateData(datos);
    clear();
  };
  let select = (src) => src.target.innerHTML;
  return (
    <div className="form col-12 m-0 col-md-4">
      {/* TIPO */}
      <DropDown
        selected={selectedTipo}
        type="list"
        title="Tipo"
        setSelected={setSelectedTipo}
        arr={["Parcial", "Notas de clase", "Taller"]}
        select={select}
      />
      {/* SEMESTRE */}
      <DropDown
        selected={selectedSemestre}
        type="list"
        setSelected={setSelectedSemestre}
        title="Semestre"
        arr={["2021-01", "2020-02", "2020-01", "2019-02", "2019-01"]}
        select={select}
      />
      {/* NOMBRE DEL PROFESOR */}
      <div className="block">
        <input
          id="upload_profesor"
          type="text"
          className="blockText ul"
          placeholder="Nombre del profesor"
        />
      </div>
      {/* MATERIA */}
      <div className="block">
        <input
          id="upload_materia"
          type="text"
          className="blockText ul"
          placeholder="Materia"
        />
      </div>
      {/* RECOMENDACIONES */}
      <DropDown
        type="textarea"
        title="Recomendaciones"
        arr={[
          <textarea
            id="upload_recomendaciones"
            rows="10"
            style={{
              background: "inherit",
              border: "none",
              color: "#fff",
              width: "100%",
              border: "1px solid #fff",
              borderRadius: "15px",
              padding: "5px",
            }}
            placeholder="Escribe algunos consejos!"
          ></textarea>,
        ]}
        select={select}
      />
      {/* SUBIR */}
      <button className="block subir">
        <img
          className="blockText"
          src={subir}
          style={{ width: "100px", height: "65px" }}
          onClick={handleSubmit}
        />
      </button>
    </div>
  );
};

export default Form;
