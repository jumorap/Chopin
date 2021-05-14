import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import AddIcon from "@material-ui/icons/Add";
import { IconButton } from "@material-ui/core";
import "../css/uploadFile.css";
import UploadForm from "./UploadForm";

const UploadFile = () => {
  const styles = {
    openButton: {
      position: "fixed",
      bottom: "5vh",
      right: "5vh",
      backgroundColor: "#AA0000",
      "&:hover": {
        backgroundColor: "#800000",
      },
    },
    openIcon: {
      color: "#FFF",
    },
  };

  const [open, setopen] = useState(false);

  const handleOpen = () => {
    setopen(true);
  };

  const handleClose = () => {
    setopen(false);
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose} className={"ModalWindow"}>
        <UploadForm />
      </Modal>

      <IconButton
        style={styles.openButton}
        className={"openButton"}
        onClick={handleOpen}
      >
        <AddIcon fontSize={"large"} className={"openIcon"} />
      </IconButton>
    </div>
  );
};

export default UploadFile;
