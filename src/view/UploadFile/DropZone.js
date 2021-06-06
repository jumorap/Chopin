import { makeStyles } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import AlertMessage from "../components/AlertMessage";
import DropFieldActive from "./DropFieldActive";
import DropFIeldDesactive from "./DropFIeldDesactive";


const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
    height: "150px",
    backgroundColor: "withe",
    borderRadius: "25px",
    borderStyle: "dashed",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
}));

function MyDropzone({ setFile }) {
  const classes = useStyles();
  
  const [openPDFerrorMessage, setopenPDFerrorMessage] = useState(false) //boolena to display the error mesagge if the file is not PDF
  

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file.type === "application/pdf") {
      setFile(file);
    } else {
      setopenPDFerrorMessage(true)
    }
  }, [setFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className={classes.container}>
      <input {...getInputProps()} />
      {isDragActive ? <DropFIeldDesactive /> : <DropFieldActive />}
      <AlertMessage open = {openPDFerrorMessage} setOpen = {setopenPDFerrorMessage} kind = {"error"}>
        Solo Aceptamos PDF
      </AlertMessage>
    </div>
  );
}

export default MyDropzone;
