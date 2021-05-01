import React, { useEffect, useState } from 'react'
import Archivos from '../Model/Archivos'
import Materias from "../Model/Materias"


const Admin = () => {
    
    const [listaMaterias, setlistaMaterias] = useState([])
    
    useEffect(() => {
        Materias.getMateriasList()
        .then(value => {
            setlistaMaterias(value)            
        })        
    }, [])
    
    //create materia form
    const [materia, setmateria] = useState("")    

    //upload file form
    const [id_materia, setid_materia] = useState("")
    const [descripcion, setdescripcion] = useState("")
    const [profesor, setprofesor] = useState("")
    const [semestre, setsemestre] = useState("")
    const [categorias, setcategorias] = useState("")
    const [usuario, setusuario] = useState("")
    const [file, setfile] = useState()
    
    const handleSumbitMateria = () =>{           
        Materias.CreateMaterias(materia)     
    }

    
    //handle file obtained in the form
    const handleFileChange = (e) => {
            let file = e.target.files[0];
            setfile(file)                
    }

    const handleSsubmitArchivo = () =>{
        Archivos.crearArchivos(id_materia, descripcion, profesor, semestre, usuario, categorias, file)
    }
    
    return (
        <div>
            <form action="submit">
                <label htmlFor="materia"></label>
                <input type="text" name="" id="materia" placeholder ="Nombre de la materia" onChange = {e=>{setmateria(e.target.value)}}/>                
                <input type="button" value="Crear materia" on onClick = {handleSumbitMateria}/>
            </form>
            <br/>
            
            {Object.entries(listaMaterias).map((val) => {
                return <pre>{`${val} `}</pre>
            })}
            
            <form>
                <label htmlFor="Materia"></label>
                <input type="text" name="" id="Materia" placeholder = "ID_Materia" onChange = {e=>{setid_materia(e.target.value)}}/>
                

                <label htmlFor="Profesor"></label>
                <input type="text" name="" id="Profesor" placeholder = "Profesor" onChange = {e=>{setprofesor(e.target.value)}}/>

                <label htmlFor="Semestre"></label>
                <input type="text" name="" id="Semestre" placeholder ="Semestre" onChange = {e=>{setsemestre(e.target.value)}}/>

                <label htmlFor="Categorias"></label>
                <input type="text" name="" id="Categorias" placeholder = "Categorias" onChange = {e=>{setcategorias(e.target.value)}}/>

                <label htmlFor="Descripcion"></label>
                <input type="text" name="" id="Descripcion" placeholder = "Descripcion" onChange = {e=>{setdescripcion(e.target.value)}}/>
                
                <label htmlFor="ID_usuario"></label>
                <input type="text" name="" id="ID_usuario" placeholder = "ID_usuario" onChange = {e=>{setusuario(e.target.value)}}/>

                <input type="file" name="" id="File"  onChange = {handleFileChange}/>
                

                <input type="button" value="Subir archivo" onClick = {handleSsubmitArchivo}/>
            </form>

        </div>
    )
}

export default Admin
