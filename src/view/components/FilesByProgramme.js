import React, { useState } from "react";
import "../css/filesByProgramme.css";
import { Modal } from "@material-ui/core";
import { FaExternalLinkAlt, FaStar } from "react-icons/all";


export function FilesByProgramme({ items = [] }) {
    const [modal, setModal] = useState(false);
    const [clicked, setClicked] = useState(undefined);
    const openAndClose = (item) => {
        setModal(!modal);
        setClicked(item);
    };

    let body = () => (
        <>
            <div className={"top-modal"}>
                <a href={clicked && clicked.url} target={"_blank"} className={"modal-links"} rel="noreferrer"><FaExternalLinkAlt/></a>
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
                        style={{backgroundColor: "rgb(82, 86, 89)"}}
                    />
                </div>
            </div>
        </>
      )

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

                        <div className={"star"}>
                            <FaStar className={"star-component"} />
                        </div>
                    </div>

                    <Modal open={modal} onClose={openAndClose}>
                        {body()}
                    </Modal>
                </div>
          )
      )

  return <>{cards}</>;
}
