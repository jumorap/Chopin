import React from "react";
import "../css/uploadedFile.css";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";

const UploadedFile = ({ fileName, setFile }) => {
  const handleClose = () => {
    setFile(null);
  };

  return (
    <div className={"uploaded-container"}>
      <div className="pdf-circle">PDF</div>

      <span className={"text-max-pdf"}>{fileName}</span>

      <IconButton onClick={handleClose} style={{boxSizing: "border-box", padding: 0,}}>
        <CloseIcon className="close-icon" />
      </IconButton>
    </div>
  );
};

export default UploadedFile;
