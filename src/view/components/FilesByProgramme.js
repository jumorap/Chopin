import React, { useState, useEffect } from "react";
import "../css/filesByProgramme.css";
import { Modal, Tooltip } from "@material-ui/core";
import {
  FaExternalLinkAlt,
  AiFillCloseCircle,
  AiFillEdit,
} from "react-icons/all";
import { firebaseAppAuth } from "../../model/firebaseSelf/firebaseConfig";
import { useParams } from "react-router-dom";
import Archivos from "../../model/Archivos"


export function FilesByProgramme({ items = [], handleEdit, setFileToEdit }) {
  
  const idCurrentMateria = useParams().idMateria;    
  const [modal, setModal] = useState(false);
  const [clicked, setClicked] = useState(undefined);
  const [delModal, setDelModal] = useState(false);
  const currentUserID = firebaseAppAuth.currentUser.uid;
  const openAndClose = (item) => {
    setModal(!modal);
    setClicked(item);
  };

  useEffect(() => {
    console.log("current user", currentUserID);
  }, []);


  //**Funcion que elimina el archivo tanto de la base de datos como del contexto */
  let deleteFile = (item) => {
    console.log(item)
    //delete from data base
    Archivos.deleteArchivos(idCurrentMateria, item.ID_archivo, item.profesor, item.semestre, item.tipo)
    //delete from context
    console.log(item)

  };

  let editFile = (item) => {
    setFileToEdit(item);
    handleEdit();
  };

  let body = () => (
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
  let CardContent = ({ item }) => (
    <div className={"files-programme"} onClick={() => openAndClose(item)}>
      <div className={"file-by-type"}>{item.tipo}</div>
      <div className={"file-by-description"}>{item.comentarios}</div>
      <div className={"file-by-teacher"}>
        <b>{item.semestre}</b> - {item.profesor}
      </div>
      <div className={"like"} />
    </div>
  );

  let DeleteModal = ({ item }) => (
    <Modal
      disableAutoFocus
      onEscapeKeyDown={(e) => console.log(e.target)}
      open={delModal}
      onClose={() => setDelModal(false)}
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
              setDelModal(false);
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
            onClick={() => setDelModal(false)}
          >
            Cancelar
                  </button>
        </div>
      </div>
    </Modal>
  );

  let CardBtns = ({ item }) => {
    return (
      currentUserID === item.usuario && (
        <>
          <Tooltip title={"Eliminar archivo"}>
            <div className={"delete"}>
              <AiFillCloseCircle
                onClick={() => setDelModal(true)}
                className={"delete-component"}
                style={{ padding: "11px 0px" }}
              />
            </div>
          </Tooltip>
          <DeleteModal item={item} />
          <Tooltip title={"Editar archivo"}>
            <div className={"edit"}>
              <AiFillEdit
                onClick={(item) => editFile(item)}
                className={"edit-component"}
                style={{ padding: "11px 0px" }}
              />
            </div>
          </Tooltip>
        </>
      )
    );
  };

  let filesModal = () => (
    <Modal
      disableAutoFocus
      open={modal}
      onClose={openAndClose}
      style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
    >
      {body()}
    </Modal>
  )

  let cards = items.map(
    (item, index) =>
      item && (
        <div
          className={"card-container"}
          key={index}
          style={{ position: "relative" }}
        >
          <CardContent item={item} />
          <CardBtns item={item} />
          {openAndClose && filesModal()}
        </div>
      )
  );

  return <>{cards}</>;
}
