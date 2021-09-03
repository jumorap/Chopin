//states for the drop file when some one has a file over the drop zone

import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import { FaFolderPlus } from "react-icons/all";

const useStyles = makeStyles(() => ({
  text: {
    color: "#959595",
    fontWeight: "bold",
    paddingTop: "0.3rem",
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    margin: "none",
    width: "var(--widthDragAndDrop)",
    padding: 0,
  },
  icon: {
    fontSize: "60px",
  },
  searchFile: {
    background: "var(--redBoard)",
    "&:hover": {
      backgroundColor: "var(--hoverRedBoard)",
    },
    color: "#FFF",
    borderRadius: 30,
    border: 0,
    padding: "4px 18px",
  },
}));


/**
 * The component when some ones has a file over the drop zone
 * @returns {JSX.Element}
 * @constructor
 */
const DropFieldActive = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <FaFolderPlus className={classes.icon} />
      <Button
        variant="contained"
        color="primary"
        className={classes.searchFile}
      >
        Cargar
      </Button>
      <p className={classes.text}>Pon tu archivo aquí</p>
    </div>
  );
};

export default DropFieldActive;
