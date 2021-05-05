import React from 'react'
import { Link } from 'react-router-dom'
import "./css/searchItem.css"

function SearchItem({nombre, link}) {
    return (
        <Link to = {`/materias/${link}`} className = "searchItme_link">
            <div className = "searchItem_container">
                {nombre}
            </div>
        </Link>
    )
}

export default SearchItem
