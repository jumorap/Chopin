import React, { useState, useEffect, useRef } from "react";
import DropDown from "./components/DropDown";
import "./css/programmeResults.css";
import { FilesByProgramme } from "./components/FilesByProgramme";
import { FaBars } from "react-icons/all";
import Slide from "react-reveal/Slide";
import UploadFile from "./UploadFile/UploadFile";
import NavBar from "./components/NavBar";
import Materias from "../model/Materias";

const categories = [
  {
    id: 11,
    value: "Parcial 1",
    type: "category",
  },
  {
    id: 12,
    value: "Parcial 2",
    type: "category",
  },
  {
    id: 13,
    value: "Parcial 3",
    type: "category",
  },
  {
    id: 14,
    value: "Parcial 4",
    type: "category",
  },
];

const professors = [
  {
    id: 21,
    value: "Ovidio Almanza",
    type: "prof",
  },
  {
    id: 22,
    value: "Pepito perez",
    type: "prof",
  },
  {
    id: 23,
    value: "Ovidio Almanza de la rosa castañeda",
    type: "prof",
  },
  {
    id: 24,
    value: "Joselito Carnaval",
    type: "prof",
  },
  {
    id: 25,
    value: "Joselito Carnaval 2.0",
    type: "prof",
  },
];

const semester = [
  {
    id: 31,
    value: "2019-1",
    type: "semester",
  },
  {
    id: 32,
    value: "2019-2",
    type: "semester",
  },
  {
    id: 33,
    value: "2020-1",
    type: "semester",
  },
  {
    id: 34,
    value: "2020-2",
    type: "semester",
  },
];

const itemsFiles = [
  {
    url: "https://firebasestorage.googleapis.com/v0/b/red-board-70d99.appspot.com/o/UNIVERSIDAD_NACIONAL%2FMaterias%2Fse8yVWYItrnikDgWXYW8%2FTaller1%20métodos%20numéricos.pdf?alt=media&token=ae6d8747-8e13-4a5b-a6f6-4f4922a1bfce",
    name: "Parcial 1",
    description:
      "El ilustrísimo maestro, doctor san Ovidio, nos compartió esta increíble guía de estudio",
    teacher: "Ovidio Almanza",
    semester: "2019-1",
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/red-board-70d99.appspot.com/o/UNIVERSIDAD_NACIONAL%2FMaterias%2Fse8yVWYItrnikDgWXYW8%2FTaller1%20métodos%20numéricos.pdf?alt=media&token=ae6d8747-8e13-4a5b-a6f6-4f4922a1bfce",
    name: "Parcial 2",
    description:
      "El ilustrísimo maestro, doctor san Ovidio, nos compartió esta increíble guía de estudio",
    teacher: "Ovidio Almanza",
    semester: "2019-2",
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/red-board-70d99.appspot.com/o/UNIVERSIDAD_NACIONAL%2FMaterias%2Fse8yVWYItrnikDgWXYW8%2FTaller1%20métodos%20numéricos.pdf?alt=media&token=ae6d8747-8e13-4a5b-a6f6-4f4922a1bfce",
    name: "Parcial 2",
    description:
      "El ilustrísimo maestro, doctor san Ovidio, nos compartió esta increíble guía de estudio",
    teacher: "Ovidio Almanza",
    semester: "2019-1",
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/red-board-70d99.appspot.com/o/UNIVERSIDAD_NACIONAL%2FMaterias%2Fse8yVWYItrnikDgWXYW8%2FTaller1%20métodos%20numéricos.pdf?alt=media&token=ae6d8747-8e13-4a5b-a6f6-4f4922a1bfce",
    name: "Parcial 2",
    description:
      "El ilustrísimo maestro, doctor san Ovidio, nos compartió esta increíble guía de estudioEl ilustrísimo maestro, doctor san Ovidio, nos compartió esta increíble guía de estudioEl ilustrísimo maestro, doctor san Ovidio, nos compartió esta increíble guía de estudioEl ilustrísimo maestro, doctor san Ovidio, nos compartió esta increíble guía de estudio",
    teacher: "Ovidio Almanza de la rosa castañeda",
    semester: "2019-2",
  },
];

const programmeName = "mater";

function ProgrammeResults({ match }) {
    const firstRender = useRef(true)                
    
    const [materiaValues, setMateriasValues] = useState({
        nombre : "Dificultades Tecnicas",
        profesores:{
            ["Profesor Pato"]: {azSq4GaF8wIModwan5PW: 1, SCYvsoMPCw42s2agjwQ7: 1},
            ["profesorPrueba"]: {IVwrevYsTiCKMPJrTohW: 1}
        },
        semestres : {
            ["2017-1"]: {azSq4GaF8wIModwan5PW: 1},
            ["2019-1"]: {SCYvsoMPCw42s2agjwQ7: 1},
            ["2021-2"]: {IVwrevYsTiCKMPJrTohW: 1},
        },
        tipos: {
            ["Parcial 3"]: {IVwrevYsTiCKMPJrTohW: 1},
            ["Parcial 7"]: {azSq4GaF8wIModwan5PW: 1},
            ["Taller 1"]: {SCYvsoMPCw42s2agjwQ7: 1},
        },
        trabajos: {            
            IVwrevYsTiCKMPJrTohW: {
                ID_archivo: "IVwrevYsTiCKMPJrTohW",
                comentarios: "descripcion",
                profesor: "profesorPrueba",
                semestre: "2021-2",
                tipo: "Parcial 3",
                url: "https://firebasestorage.googleapis.com/v0/b/red-board-70d99.appspot.com/o/UNIVERSIDAD_NACIONAL%2FMaterias%2Fse8yVWYItrnikDgWXYW8%2FIVwrevYsTiCKMPJrTohW?alt=media&token=3bd01c8a-3538-43b0-9cf3-d6d897392e84"
            },
            SCYvsoMPCw42s2agjwQ7: {
                ID_archivo: "SCYvsoMPCw42s2agjwQ7",
                comentarios: "descripcion",
                profesor: "Profesor Pato",
                semestre: "2019-1",
                tipo: "Taller 1",
                url: "https://firebasestorage.googleapis.com/v0/b/red-board-70d99.appspot.com/o/UNIVERSIDAD_NACIONAL%2FMaterias%2Fse8yVWYItrnikDgWXYW8%2FSCYvsoMPCw42s2agjwQ7?alt=media&token=c7521a14-ace4-4db8-89a8-3bf4f728f7d1"
            }
        }
    })
    
    /**Muestra las materia actual segun la pagina web en la que se encuentre */
    useEffect(() => {
        if(firstRender.current === true){                        
            console.log(new Materias(match.params.idMateria))    
            firstRender.current = false
        }else{
        }
    }, [])
    
    
  
  const [open, setOpen] = useState(false);
  const [filtering, setFiltering] = useState(false);
  const [selection, setSelection] = useState([]);

  useEffect(() => {
    if (selection.length !== 0) setFiltering(true);
    else setFiltering(false);
    /* selection.forEach((el) => console.log(el)); */
  }, [selection]);

  function programme(properties, propertiesHamburger, redBar) {
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
          {filtering ? (
            <FilesByProgramme
              items={itemsFiles.map((file) => {
                let check = 0;
                ["category", "prof", "semester"].forEach((type) => {
                  let choosen = selection.filter((filt) => filt.type == type);
                  console.log(type, "foo", choosen);
                  if (choosen.length) {
                    if (
                      type === "category" &&
                      choosen.find((elem) => elem.value === file.name)
                    )
                      check++;
                    if (
                      type === "prof" &&
                      choosen.find((elem) => elem.value === file.teacher)
                    )
                      check++;
                    if (
                      type === "semester" &&
                      choosen.find((elem) => elem.value === file.semester)
                    )
                      check++;
                  } else {
                    check++;
                  }
                });
                if (check === 3) return file;
              })}
            />
          ) : (
            <FilesByProgramme items={itemsFiles} />
          )}
        </div>
      </div>
    );
  }

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
              items={semester}
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
      <UploadFile />
    </div>
  );
}

export default ProgrammeResults;
