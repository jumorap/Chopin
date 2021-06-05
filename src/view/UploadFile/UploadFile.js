import React from "react";
import AddIcon from "@material-ui/icons/Add";
import { IconButton } from "@material-ui/core";
import "../css/uploadFile.css";

const UploadFile = ({ handleOpen }) => {
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

  return (
    <div>
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
