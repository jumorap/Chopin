import React from "react";
import { Link } from "react-router-dom";
import "../css/searchItem.css";

function SearchItem({ nombre, link }) {
  return (
    <Link to={`/materias/${link}`}  target = "_blank" className="search-item-link">
      <div className="search-item-container">{nombre}</div>
    </Link>
  );
}

export default SearchItem;
