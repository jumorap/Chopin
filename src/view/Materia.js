import React, { useEffect, useRef } from 'react'
import Materias from '../model/Materias'
import "./css/materia.css"

function Materia({match}) {
    
    const materiasValues = useRef(new Materias(match.params.idMateria))    
    console.log(materiasValues.current)


    return (
        <div>
{/*             <h1>
                {materiasValues.current.nombre}
            </h1>
            <p>
                {match.params.idMateria}
            </p> */}
            <div className="materias_filro">
                
            </div>


        </div>
    )
}

export default Materia
