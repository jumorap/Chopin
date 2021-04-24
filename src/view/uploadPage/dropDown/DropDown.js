import React, { useState } from "react";

const DropDown = ({ selected, setSelected, arr, select, title, type }) => {
  const handleClick = (ev) => {
    if (type === "list") setSelected(select(ev));
  };

  let render = arr.map((el, index) => (
    <div
      key={index}
      className="blockElement"
      data-bs-toggle="collapse"
      data-bs-target={`#flush-${type === "list" ? title : ""}`}
      aria-expanded="false"
      aria-controls={`flush-${type === "list" ? title : ""}`}
      onClick={(ev) => handleClick(ev)}
    >
      {el}
    </div>
  ));

  return (
    <div className="block accordion accordion-flush" id="accordionFlushExample">
      <h2
        id="flush-headingTwo"
        className="collapsed blockText"
        data-bs-toggle="collapse"
        data-bs-target={`#flush-${title}`}
        aria-expanded="false"
        aria-controls={`flush-${title}`}
      >
        {type === "list" ? selected || title : title}
      </h2>
      <div
        id={`flush-${title}`}
        className="accordion-collapse collapse"
        aria-labelledby="flush-headingTwo"
        data-bs-parent="#accordionFlushExample"
      >
        {render}
      </div>
    </div>
  );
};

export default DropDown;
