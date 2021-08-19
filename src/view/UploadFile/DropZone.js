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

//limite in bites for the maximum possible value that a file could have in megaBytes
const maxFileSize = 5

function MyDropzone({ setFile }) {
  const classes = useStyles();
  
  const [openPDFerrorMessage, setopenPDFerrorMessage] = useState(false) //boolena to display the error mesagge if the file is not PDF
  const [errorMessage, setErrorMessage] = useState("")

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];    
    if (file.type !== "application/pdf") {
      setErrorMessage("De momento, solo admitimos PDF")
      setopenPDFerrorMessage(true)
      return
    }

    if (maxFileSize * Math.pow(10, 6) < file.size){
      setErrorMessage("El limite es " + maxFileSize + " megabytes")
      setopenPDFerrorMessage(true)      
      return
    }


    setFile(file);        
    
  }, [setFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className={classes.container}>
      <input {...getInputProps()} />
      {isDragActive ? <DropFIeldDesactive /> : <DropFieldActive />}
      <AlertMessage open = {openPDFerrorMessage} setOpen = {setopenPDFerrorMessage} kind = {"error"}>
        {errorMessage}
      </AlertMessage>
    </div>
  );
}

export default MyDropzone;
