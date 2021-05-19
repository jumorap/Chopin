import React from "react";
import { Link, useHistory } from "react-router-dom";
import "../css/searchItem.css";

function SearchItem({ nombre, link }) {
  let history = useHistory()
  
  return (    
    <Link to={`/materias/${link}`} className="search-item-link">
      <div className="search-item-container">{nombre}</div>
    </Link>
  );
}

export default SearchItem;
