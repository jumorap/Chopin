import React from "react";
import Navbar from "./Navbar";
import Dnd from "./Dnd";
import Form from "./Form";

const UploadFilePage = () => {
  return (
    <div className="container-fluid">
      <Navbar />
      <h1>Nombre de la materia</h1>
      <div className="row">
        <Form />
        <Dnd />
      </div>
    </div>
  );
};

export default UploadFilePage;
