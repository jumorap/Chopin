import React, { useState, useEffect } from "react";
import "../css/filesByProgramme.css";
import { Modal } from "@material-ui/core";
import {
  FaExternalLinkAlt,
  AiFillCloseCircle,
  AiFillEdit,
} from "react-icons/all";
import { firebaseAppAuth } from "../../model/firebaseSelf/firebaseConfig";

export function FilesByProgramme({ items = [] }) {
  const [modal, setModal] = useState(false);
  const [clicked, setClicked] = useState(undefined);
  const currentUserID = firebaseAppAuth.currentUser.uid;
  const openAndClose = (item) => {
    setModal(!modal);
    setClicked(item);
  };

  useEffect(() => {
    console.log("current user", currentUserID);
  }, []);

  let deleteFile = () => {};

  let editFile = () => {};

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

  let cards = items.map(
    (item, index) =>
      item && (
        <div className={"card-container"} key={index}>
          <div className={"files-programme"} onClick={() => openAndClose(item)}>
            <div className={"file-by-type"}>{item.tipo}</div>
            <div className={"file-by-description"}>{item.comentarios}</div>
            <div className={"file-by-teacher"}>
              <b>{item.semestre}</b> - {item.profesor}
            </div>

            <div className={"like"} />

            {currentUserID == item.usuario && (
              <>
                <div className={"delete"}>
                  <AiFillCloseCircle
                    onClick={deleteFile}
                    className={"delete-component"}
                    style={{ padding: "3px 0px" }}
                  />
                </div>
                <div className={"edit"}>
                  <AiFillEdit
                    onClick={editFile}
                    className={"edit-component"}
                    style={{ padding: "3px 0px" }}
                  />
                </div>
              </>
            )}
          </div>

          <Modal open={modal} onClose={openAndClose}>
            {body()}
          </Modal>
        </div>
      )
  );

  return <>{cards}</>;
}
