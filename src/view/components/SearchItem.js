import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import "../css/searchItem.css";
import {firebaseAnalytics} from "../../model/firebaseSelf/firebaseConfig";

function SearchItem({ nombre, link, click }) {

    /*Google analytics*/
    useEffect(() => {
        firebaseAnalytics.logEvent(`searched_/materias/${link}`)
    })
  
  return (    
    <Link to={`/materias/${link}`} className="search-item-link" onClick = {click}>
      <div className="search-item-container">{nombre}</div>
    </Link>
  );
}

export default SearchItem;
