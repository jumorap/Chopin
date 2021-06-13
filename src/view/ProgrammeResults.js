import React, { useState, useEffect } from "react";
import DropDown from "./components/DropDown";
import "./css/programmeResults.css";
import { FilesByProgramme } from "./components/FilesByProgramme";
import { FaBars, IoMdClose } from "react-icons/all";
import UploadFile from "./UploadFile/UploadFile";
import NavBar from "./components/NavBar";
import Materias from "../model/Materias";
import { useMateriaMap } from "./ContextProvider";
import { useParams } from "react-router-dom";

function ProgrammeResults({ toggleUploadFileModal, setFileToEdit }) {
  /* const firstRender = useRef(true); */
  const [firstRender, setfirstRender] = useState(true);

  /**The conection with the provider to check the existence of the subject */
  const materiaMap = useMateriaMap();

  /**The Id bring by the context that has the id of the materia to be displayed */
  const idCurrentMateria = useParams().idMateria;

  useEffect(() => {
    console.log("hola" , idCurrentMateria);
    if (materiaMap.has(idCurrentMateria)) {
      console.log("EL archivo ya se encuentra en el context");
      setMateriaValues(materiaMap.get(idCurrentMateria));
    } else {
      fetchFiles();
    }
    setfirstRender(false);
    setSelection([]);
  }, [idCurrentMateria]);

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
    Object.keys(object).forEach((key) => {
      objectArray.push(object[key]);
    });
    //console.log(objectArray);
    return objectArray;
  }

  let fetchFiles = () => {
    Materias._getFilesList(idCurrentMateria).then((value) => {
      console.log(value.data());
      setMateriaValues({
        ...value.data(),
        trabajos: getArrayFromObject(value.data().trabajos),
      });
    });
  };

  //when the Materia is featched form the DB, it updates the materiaMap context value
  useEffect(() => {
    if (firstRender === false) {
      if (!materiaMap.has(idCurrentMateria)) {
        materiaMap.set(idCurrentMateria, { ...materiaValues });
        console.log("Se acaba de actualizar el valor de el map Materia");
      }
    }
  }, [materiaValues]);

  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState([]);

  let filteredFiles = materiaValues.trabajos.map((file) => {
    let check = 0;
    ["category", "prof", "semester"].forEach((type) => {
      let choosen = selection.filter((filt) => filt.type === type);
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

  const categories = Object.keys(materiaValues.tipos)
    .sort()
    .map((cat, index) => {
      return { id: `cat-${index}`, value: cat, type: "category" };
    });

  const professors = Object.keys(materiaValues.profesores)
    .sort()
    .map((professor, index) => {
      return { id: `professor-${index}`, value: professor, type: "prof" };
    });

  let semesters = Object.keys(materiaValues.semestres)
    .sort()
    .map((semester, index) => {
      return { id: `semester-${index}`, value: semester, type: "semester" };
    });

  useEffect(() => {
    console.log("trabajos: ", materiaValues.trabajos);
  }, []);

  let programme = (properties, propertiesHamburger, redBar) => {
    return (
      <div className={`files-section ${properties}`}>
        <div className={`title-programme ${redBar}`}>
          {open ? (
            <IoMdClose
              className={propertiesHamburger}
              onClick={() => setOpen(!open)}
            />
          ) : (
            <FaBars
              className={propertiesHamburger}
              onClick={() => setOpen(!open)}
            />
          )}
          {materiaValues.nombre}
        </div>
        <div className={"for-each-programme"}>
          <FilesByProgramme
            items={filteredFiles}
            handleEdit={toggleUploadFileModal}
            setFileToEdit={(file) => setFileToEdit(file)}
          /*materia={materiaValues}*/
          />
        </div>
      </div>
    );
  };

  let principalMenu = (title, items) => {
    return (
      <DropDown
        title={title}
        items={items}
        selection={selection}
        setSelection={setSelection}
        multiSelect
      />
    );
  };



  return (
    <div className={"general"}>
      <NavBar />
      {open ? (
        <div className={"principal-menu-bar principal-menu-bar-non-clicked"}>
          {principalMenu("Categoría", categories)}
          {principalMenu("Profesor", professors)}
          {principalMenu("Semestre", semesters)}
        </div>
      ) : (
        <div className={"principal-menu-bar hide-principal-menu-bar"} />
      )}
      {open
        ? programme(
          "files-section-non-clicked",
          "hamburger-menu hamburger-menu-clicked",
          "red-bar"
        )
        : programme("files-section-clicked", "hamburger-menu")}
      <UploadFile handleOpen={toggleUploadFileModal} />
    </div>
  );
}

export default ProgrammeResults;
