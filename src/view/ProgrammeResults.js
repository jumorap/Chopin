import React, { useState, useEffect, useRef } from "react";
import DropDown from "./components/DropDown";
import "./css/programmeResults.css";
import { FilesByProgramme } from "./components/FilesByProgramme";
import { FaBars } from "react-icons/all";
import Slide from "react-reveal/Slide";
import UploadFile from "./UploadFile/UploadFile";
import NavBar from "./components/NavBar";
import Materias from "../model/Materias";

const programmeName = "mater";

function ProgrammeResults({ match }) {
  const firstRender = useRef(true);

  const [materiaValues, setMateriaValues] = useState({
    nombre: "Dificultades Tecnicas",
    profesores: {},
    semestres: {},
    tipos: {},
    trabajos: [
      {
        ID_archivo: "IVwrevYsTiCKMPJrTohW",
        comentarios: "Lamentablemente no hay archivos, sube alguno!",
        profesor: "",
        semestre: "",
        tipo: "No hay archivos disponibles",
        url: "",
      },
    ],
  });

  /**Muestra las materia actual segun la pagina web en la que se encuentre */

  function getArrayFromObject(object) {
    const objectArray = [];
    Object.keys(object).map((key) => {
      objectArray.push(object[key]);
    });
    //console.log(objectArray);
    return objectArray;
  }

  let fetchFiles = () => {
    Materias._getFilesList(match.params.idMateria).then((value) => {
      console.log(value.data());
      setMateriaValues({
        ...value.data(),
        trabajos: getArrayFromObject(value.data().trabajos),
      });
      console.log("foo2: ", getArrayFromObject(value.data().trabajos));
    });
  };

  useEffect(() => {
    if (firstRender.current === true) {
      fetchFiles();
      firstRender.current = false;
    }
  });

  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState([]);

  let filteredFiles = materiaValues.trabajos.map((file) => {
    let check = 0;
    ["category", "prof", "semester"].forEach((type) => {
      let choosen = selection.filter((filt) => filt.type == type);
      /* console.log(type, "foo", choosen); */
      if (choosen.length) {
        if (
          type === "category" &&
          choosen.find((elem) => elem.value === file.tipo)
        )
          check++;
        if (
          type === "prof" &&
          choosen.find((elem) => elem.value === file.profesor)
        )
          check++;
        if (
          type === "semester" &&
          choosen.find((elem) => elem.value === file.semestre)
        )
          check++;
      } else {
        check++;
      }
    });
    if (check === 3) return file;
  });

  const categories = Object.keys(materiaValues.tipos).map((cat, index) => {
    return { id: `cat-${index}`, value: cat, type: "category" };
  });
  const professors = Object.keys(materiaValues.profesores).map(
    (professor, index) => {
      return { id: `professor-${index}`, value: professor, type: "prof" };
    }
  );

  let semesters = Object.keys(materiaValues.semestres).map(
    (semester, index) => {
      return { id: `semester-${index}`, value: semester, type: "semester" };
    }
  );

  let programme = (properties, propertiesHamburger, redBar) => {
    return (
      <div className={`files-section ${properties}`}>
        <div className={`title-programme ${redBar}`}>
          <FaBars
            className={propertiesHamburger}
            onClick={() => setOpen(!open)}
          />
          {materiaValues.nombre}
        </div>
        <div className={"for-each-programme"}>
          <FilesByProgramme items={filteredFiles} />
        </div>
      </div>
    );
  };

  return (
    <div className={"general"}>
      <NavBar />
      {open && (
        <Slide left>
          <div className={"principal-menu-bar"}>
            <DropDown
              title="Categoría"
              items={categories}
              selection={selection}
              setSelection={setSelection}
              multiSelect
            />
            <DropDown
              title="Profesor"
              items={professors}
              selection={selection}
              setSelection={setSelection}
              multiSelect
            />
            <DropDown
              title="Semestre"
              items={semesters}
              selection={selection}
              setSelection={setSelection}
              multiSelect
            />
          </div>
        </Slide>
      )}
      {open
        ? programme(
            "files-section-non-clicked",
            "hamburger-menu hamburger-menu-clicked",
            "red-bar"
          )
        : programme("files-section-clicked", "hamburger-menu")}
      <UploadFile onClick={fetchFiles} />
    </div>
  );
}

export default ProgrammeResults;
