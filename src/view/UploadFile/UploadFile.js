import React from "react";
import AddIcon from "@material-ui/icons/Add";
import { IconButton } from "@material-ui/core";
import "../css/uploadFile.css";


const UploadFile = ({ handleOpen }) => {
  const styles = {
    openButton: {
      boxShadow: "rgb(0 0 0 / 30%) 0 3px 5px 2px",
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

  return (
    <div>
      <IconButton
        style={styles.openButton}
        className={"openButton"}
        onClick={handleOpen}
        aria-label="upload file"
      >
        <AddIcon fontSize={"large"} className={"openIcon"} />
      </IconButton>
    </div>
  );
};

export default UploadFile;
