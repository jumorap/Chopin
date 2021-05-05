import React from 'react'
import "./css/searchItem.css"

function SearchItem({nombre, link}) {
    return (
        <div className = "searchItem_container">
            {nombre}
        </div>
    )
}

export default SearchItem
