import { makeStyles } from "@material-ui/core";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import DropFieldActive from "./DropFieldActive";
import DropFIeldDesactive from "./DropFIeldDesactive";

const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
    height: "140px",
    backgroundColor: "withe",
    borderRadius: "25px",
    borderStyle: "dashed",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop:"15px"
  },
}));

function MyDropzone({ setFile }) {
  const classes = useStyles();

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file.type === "application/pdf") {
      setFile(file);
    } else {
      alert("Solo se acepta pdf parcero");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className={classes.container}>
      <input {...getInputProps()} />
      {isDragActive ? <DropFIeldDesactive /> : <DropFieldActive />}
    </div>
  );
}

export default MyDropzone;
