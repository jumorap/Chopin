import React, { useEffect, useRef, useState } from "react";
import SearchItem from "./SearchItem";
import "../css/searcher.css";

//icons
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import { useFullTextSearch } from "../ContextProvider";

function Searcher() {
  /**Texto de la barra del buscador */
  const [searchText, setsearchText] = useState("");

  /**Usado para  mostrar las materias dado una busqueda*/
  const [searchResults, setsearchResults] = useState([]);

  const firstRender = useRef(true);

  

  /**Traemos el full textSearch del context*/
  const searcherEngine = useFullTextSearch();

  /**Modifica el texto de input y los resultados que este arroja */
  const handleInputTextChange = (e) => {
    setsearchText(e.target.value);
  };

  /**side effect que actualiza la searchResults cada vez que cambia la input */
  useEffect(() => {
    if (firstRender.current === true) {
      firstRender.current = false;
    } else {
      setsearchResults(searcherEngine.queryData(searchText));
    }
  }, [searchText, searcherEngine]);

  /**activated when the close button is pressed */
  const handleCloseButton = () => {
    setsearchText("");
  };

  return (
    <div className="searcher-container">
      <div className="searcher-container-input ">
        <input
          type="text"
          name="search"
          id="search"
          className="searcher-input"
          placeholder="Escribe el nombre de la materia"
          value={searchText}
          onChange={handleInputTextChange}
          autoComplete="off"
        />
        <div className="faic">
          <IconButton
            onClick={handleCloseButton}
            style={{
              margin: 0,
              padding: 0,
              marginRight: "5px",
            }}
          >
            <ClearIcon className="icon" />
          </IconButton>
          <SearchIcon className="icon" />
        </div>
      </div>

      {/* Diplay search results */}
      {searchResults.map((val) => (
        <SearchItem nombre={val.data} link={val.id} key={val.id} click = {handleCloseButton}/>
      ))}
    </div>
  );
}

export default Searcher;
