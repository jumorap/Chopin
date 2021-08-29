import React from "react";
import AddIcon from "@material-ui/icons/Add";
import { IconButton } from "@material-ui/core";
import "../css/uploadFile.css";
import Tooltip from '@material-ui/core/Tooltip';

/**
 * Button with the + symbol used to add a new pdf
 * @param {handleOpen} bool pone and close de uploadFile
 * @returns 
 */

export const styles = {
    openButton: {
        boxShadow: "rgb(0 0 0 / 30%) 0 3px 5px 2px",
        position: "fixed",
        bottom: "5vh",
        right: "5vh",
        backgroundColor: "var(--redBoard)",
        "&:hover": {
            backgroundColor: "var(--hoverRedBoard)",
        },
    },
    openIcon: {
        color: "#FFF",
    },
};

const UploadFile = ({ handleOpen }) => {
  return (
    <div>
      <Tooltip title={"Sube archivo"}>
      <IconButton
        style={styles.openButton}
        className={"openButton"}
        onClick={handleOpen}
        aria-label={"upload file"}
      >
        <AddIcon fontSize={"large"} className={"openIcon"} />
      </IconButton>
      </Tooltip>
    </div>
  );
};

export default UploadFile;
