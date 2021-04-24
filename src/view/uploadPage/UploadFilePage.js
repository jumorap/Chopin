import React from "react";
import Navbar from "./Navbar";
import Dnd from "./Dnd";
import Form from "./Form";
import "../../css/uploadDocument.css";

const UploadFilePage = () => {
  return (
    <div className="uploadDocument container-fluid">
      <Navbar />
      <span className="row m-1 nombreMateria">Nombre de la materia</span>
      <div className="row justify-content-center m-0">
        <Form />
        <Dnd />
      </div>
    </div>
  );
};

export default UploadFilePage;
