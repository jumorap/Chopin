
import React from "react";
import { makeStyles } from "@material-ui/core";
import { FaFilePdf } from "react-icons/all";


const useStyles = makeStyles(() => ({
  text: {
    color: "#FFF",
    fontWeight: "bold",
    paddingTop: "0.3rem",
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "#B85454",
    width: "var(--widthDragAndDrop)",
    height: "100%",
    borderRadius: "22px",
    color: "#FFF",
    marginTop: 0,
  },
  icon: {
    color: "#FFF",
    fontSize: "60px",
  },
}));

const DropFIeldDesactive = () => {
  const classes = useStyles();

  return (
    <div className={classes.container} style={{marginTop: 0}}>
      <FaFilePdf className={classes.icon} />
      <p className={classes.text}>Suelta el archivo</p>
    </div>
  );
};

export default DropFIeldDesactive;
