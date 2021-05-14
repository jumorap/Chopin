import React, { useState, Suspense } from "react";
import "../css/filesByProgramme.css";
import { Modal } from "@material-ui/core";
import Zoom from "react-reveal/Zoom";
import { CgSpinner, FaStar } from "react-icons/all";

export function FilesByProgramme({ items = [] }) {
  const [modal, setModal] = useState(false);
  const openAndClose = () => {
    setModal(!modal);
  };
  console.log(items);
  function body(item) {
    return (
      <div className={"modal"}>
        <Zoom>
          <div align="center" className={"pdf-container"}>
            <Suspense fallback={<CgSpinner className={"load-spinner"} />}>
              <object
                data={item.url}
                type="application/pdf"
                width="100%"
                height="100%"
              ></object>
            </Suspense>
          </div>
        </Zoom>
      </div>
    );
  }

  return (
    <>
      {items.length
        ? items.map(
            (item) =>
              item && (
                <div className={"card-container"}>
                  <div
                    className={"files-programme"}
                    onClick={() => openAndClose()}
                  >
                    <div className={"file-by-type"}>{item.name}</div>
                    <div className={"file-by-description"}>
                      {item.description}
                    </div>
                    <div className={"file-by-teacher"}>
                      <b>{item.semester}</b> - {item.teacher}
                    </div>

                    <div className={"like"} />

                    <div className={"star"}>
                      <FaStar className={"star-component"} />
                    </div>
                  </div>

                  <Modal open={modal} onClose={openAndClose}>
                    {body(item)}
                  </Modal>
                </div>
              )
          )
        : ""}
    </>
  );
}
