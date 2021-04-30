import React, { useState } from 'react'
import Materias from "../Model/Materias"


const Admin = () => {
    
    const [materia, setmateria] = useState("")

    
    const handleSumbitMateria = () =>{           
        Materias.CreateMaterias(materia)     
    }
    
    return (
        <div>
            <form action="submit">
                <label htmlFor="materia"></label>
                <input type="text" name="" id="materia" placeholder ="Nombre de la materia" onChange = {e=>{setmateria(e.target.value)}}/>
                <input type="button" value="Crear materia" on onClick = {handleSumbitMateria}/>
            </form>
        </div>
    )
}

export default Admin
