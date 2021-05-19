import React from "react";
import { Link } from "react-router-dom";
import "../css/searchItem.css";

function SearchItem({ nombre, link, click }) {  
  
  return (    
    <Link to={`/materias/${link}`} className="search-item-link" onClick = {click}>
      <div className="search-item-container">{nombre}</div>
    </Link>
  );
}

export default SearchItem;
