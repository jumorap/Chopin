import React, { useState } from "react";
import "../css/filesByProgramme.css";
import { Modal, Popover, Tooltip } from "@material-ui/core";
import {
  FaExternalLinkAlt,
  AiFillCloseCircle,  
} from "react-icons/all";
import { firebaseAppAuth } from "../../model/firebaseSelf/firebaseConfig";
import { useParams } from "react-router-dom";
import Archivos from "../../model/Archivos"
import { useMateriaMap } from "../ContextProvider";


export function FilesByProgramme({ items = [], handleEdit, setFileToEdit }) {
  
  const [materiaMap, setMateriaMap] = useMateriaMap();
  const idCurrentMateria = useParams().idMateria;    
  const [openFileModal, setOpenFileModal] = useState(false);
  const [clicked, setClicked] = useState(undefined);
  const currentUserID = firebaseAppAuth.currentUser.uid;
  
  const handleOpenFilesModal = (item) => {
    setOpenFileModal(prev => !prev);
    setClicked(item);
  };
  

  //**Funcion que elimina el archivo tanto de la base de datos como del contexto */
  let deleteFile = (item) => {    
    //delete from data base
    Archivos.deleteArchivos(idCurrentMateria, item.ID_archivo, item.profesor, item.semestre, item.tipo)
    //delete from context            
    materiaMap.delete_archivo(item, idCurrentMateria)           
    setMateriaMap(materiaMap.copy())
  };
  

  let PdfFile = () => (
    <>
      <div className={"top-modal"}>
        <a
          href={clicked && clicked.url}
          target={"_blank"}
          className={"modal-links"}
          rel="noreferrer"
        >
          <FaExternalLinkAlt />
        </a>
      </div>
      <div className="modal">
        <div align="center" className={"pdf-container"}>
          <object
            data={clicked && clicked.url}
            type="application/pdf"
            width="100%"
            height="100%"
            aria-label={clicked && clicked.url}
            title={clicked && clicked.url}
            style={{ backgroundColor: "rgb(82, 86, 89)" }}
          />
        </div>
      </div>
    </>
  );

  //**Carta que se va a mostrar */
  let CardContent = ({ item }) => {
    const hasNote = item.nota !== ""     
  console.log(item)
    return(    
    <div className={"files-programme"} onClick={() => handleOpenFilesModal(item)}>
      <div className={"file-by-type"}>{item.tipo}</div>
      <div className={"file-by-description"}>{item.comentarios}</div>
      <div className="file-by-teacher-like">
        <div className={"file-by-teacher"}>
          <b>{item.semestre}</b> - {item.profesor}
        </div>            
        {hasNote &&
          <Tooltip title = {"Nota"} className={"like"}>
          <div >
            {item.nota}
          </div>      
          </Tooltip>
        }
      </div>
    </div>
  )};

  /**Modal mostrado al oprimir el boton de eliminar un archivo */
  let DeleteModal = ({ item, openModal, setopenModal }) => {    
    return (
      <Modal
        disableAutoFocus
        onEscapeKeyDown={(e) => console.log(e.target)}
        open={openModal}
        onClose={() => setopenModal(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className="delete-modal-container"
      >
        <div className="delete-modal">
          <h1>Eliminar!</h1>
          <span>¿Seguro deseas eliminar el archivo?</span>
          <div>
            <button
              style={{
                backgroundColor: "red",
                border: "none",
                borderRadius: "5px",
                color: "white",
              }}
              onClick={() => {
                setopenModal(false);
                deleteFile(item);
              }}
            >
              Eliminar
                    </button>
            <button
              style={{
                backgroundColor: "green",
                border: "none",
                borderRadius: "5px",
                color: "white",
              }}
              onClick={() => setopenModal(false)}
            >
              Cancelar
                    </button>
          </div>
        </div>
      </Modal>
    )
  };

  /**Los botones de eliminar y editar que son mostrados en las cards */
  let CardBtns = ({ item }) => {
    const [openModal, setopenModal] = useState(false)
    return (
      currentUserID === item.usuario && (
        <>
          <Tooltip title={"Eliminar archivo"}>
            <div className={"delete"}>
              <AiFillCloseCircle
                onClick={() => setopenModal(true)}
                className={"delete-component"}
                style={{ padding: "11px 0px" }}
              />
            </div>
          </Tooltip>
          <DeleteModal item={item} openModal = {openModal} setopenModal = {setopenModal}/>
        </>
      )
    );
  };

  /** */
  let filesModal = () => (
    <Modal
      disableAutoFocus
      open={openFileModal}
      onClose={handleOpenFilesModal}
      style={{ backgroundColor: "rgba(0, 0, 0, 0)",
          lineHeight: 1,
          backdropFilter: "blur(3px)" }}
    >
      {PdfFile()}
    </Modal>
  )

  /**Las cartas que se muestran */
  let cards = items.map(
    (item, index) =>
      item && (
        <div
          className={"card-container"}
          key={index}
          style={{ position: "relative" }}
        >           
          {item.calificado && <span className="calificado">Resuelto</span>}
          <CardContent item={item} /> 
          <CardBtns item={item} />          
        </div>
      )
  );

  return (
  <>
  {cards}
  {filesModal()}
  </>);
}
