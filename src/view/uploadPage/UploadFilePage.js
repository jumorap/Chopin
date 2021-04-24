import React from "react";
import Navbar from "./Navbar";
import Dnd from "./Dnd";
import Form from "./Form";
import "../../css/uploadDocument.css";

const UploadFilePage = () => {
  return (
    <div className="uploadDocument">
      <Navbar />
      <span className="nombreMateria">Nombre de la materia</span>
      <div className="">
        <Form />
        <Dnd />
      </div>
    </div>
  );
};

export default UploadFilePage;
