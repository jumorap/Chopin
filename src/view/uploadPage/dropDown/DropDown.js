import React, { useState } from "react";

const DropDown = ({ selected, setSelected, arr, select, title }) => {
  /* let tipos = ["Parcial", "Taller", "Notas de clase"];
  let semestres = ["2021-01", "2020-02", "2020-01", "2019-02", "2019-01"]; */
  let render = arr.map((el, index) => (
    <div key={index} className="" onClick={(ev) => setSelected(select(ev))}>
      {el}
    </div>
  ));
  /* let renderSemestres = semestres.map((el, index) => (
    <div
      key={index}
      className=""
      onClick={(ev) => setSelectedSemestre(select(ev))}
    >
      {el}
    </div>
  )); */

  return (
    <div className="accordion accordion-flush" id="accordionFlushExample">
      <div className="">
        <h2 id="flush-headingTwo">
          <div
            className="collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseTwo"
            aria-expanded="false"
            aria-controls="flush-collapseTwo"
          >
            {selected || title}
          </div>
        </h2>
        <div
          id="flush-collapseTwo"
          className="accordion-collapse collapse"
          aria-labelledby="flush-headingTwo"
          data-bs-parent="#accordionFlushExample"
        >
          <div>{render}</div>
        </div>
      </div>
    </div>
  );
};

export default DropDown;
