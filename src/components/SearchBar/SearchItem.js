import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import "../../css/searchItem.css";
import {firebaseAnalytics} from "../../firebase/firebaseConfig";

function SearchItem({ nombre, link, click, selected = false }) {

    /*Google analytics*/
    useEffect(() => {
        firebaseAnalytics.logEvent(`searched_/materias/${link}`)
    })
    
  return (        
    <Link to={`/materias/${link}`} className="search-item-link" onClick = {click}>                
      <div className={"search-item-container".concat(selected? " selected-search" : "")}>
        {nombre}
      </div>
    </Link>
  );
}

export default SearchItem;
