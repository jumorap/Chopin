import React from "react";
import { Link } from "react-router-dom";
import "../css/searchItem.css";

function SearchItem({ nombre, link }) {
  return (
      <span>
          <a href={`/materias/${link}`} className="search-item-link" >
              <div className="search-item-container">{nombre}</div>
          </a>
      </span>
  )
}

export default SearchItem;
