import React, { useState, useEffect } from "react";
import "../css/filesByProgramme.css";
import { Modal, Tooltip, Popover, CardContent } from "@material-ui/core";
import {
  FaExternalLinkAlt,
  AiFillCloseCircle,
  AiFillEdit,
} from "react-icons/all";
import { firebaseAppAuth } from "../../model/firebaseSelf/firebaseConfig";

export function FilesByProgramme({ items = [], handleEdit, setFileToEdit }) {
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

  let deleteFile = () => {};

  let editFile = (item) => {
    handleEdit();
    setFileToEdit(item);
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
      disableEscapeKeyDown
      disableBackdropClick
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
              background: "red",
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
              background: "green",
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
      currentUserID == item.usuario && (
        <>
          <Tooltip title={"Eliminar archivo"}>
            <div className={"delete"}>
              <AiFillCloseCircle
                onClick={() => setDelModal(true)}
                className={"delete-component"}
                style={{ padding: "3px 0px" }}
              />
            </div>
          </Tooltip>
          <DeleteModal item={item} />
          <Tooltip title={"Editar archivo"}>
            <div className={"edit"}>
              <AiFillEdit
                onClick={() => editFile(item)}
                className={"edit-component"}
                style={{ padding: "3px 0px" }}
              />
            </div>
          </Tooltip>
        </>
      )
    );
  };

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
          <Modal open={modal} onClose={openAndClose}>
            {body()}
          </Modal>
        </div>
      )
  );

  return <>{cards}</>;
}
