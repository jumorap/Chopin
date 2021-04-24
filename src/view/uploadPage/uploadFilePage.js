import React from "react";
import Navbar from "navbar";
import Dnd from "./Dnd";
import Form from "./Form";

const uploadFilePage = () => {
  return (
    <>
      <Navbar />
      <h1>Nombre de la materia</h1>
      <Dnd />
      <Form />
    </>
  );
};

export default uploadFilePage;
