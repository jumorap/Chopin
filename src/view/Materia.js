import React, { useEffect, useRef } from 'react'
import Materias from '../model/Materias'

function Materia({match}) {
    
    const materiasValues = useRef(new Materias(match.params.idMateria))    
    console.log(materiasValues.current)

    return (
        <div>
            <h1>
                {materiasValues.current.nombre}
            </h1>
            <p>
                {match.params.idMateria}
            </p>

        </div>
    )
}

export default Materia
