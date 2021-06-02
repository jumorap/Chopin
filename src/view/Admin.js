import React, { useEffect, useRef, useState } from 'react'
import FullTextSeachMaterias from '../controler/FullTextSearchMaterias'
import Archivos from '../model/Archivos'
import Materias from "../model/Materias"
import Profesores from "../model/Profesores"


const Admin = () => {

    //estado para mostrar la lista de todas las materias disonibles y su codig
    const [listaMaterias, setlistaMaterias] = useState([])

    //estado para guardar el objeto FullTextSearch
    const ref = useRef("")

    useEffect(() => {
        Materias.getMateriasList()
            .then(value => {
                setlistaMaterias(value)
                console.log(value)
            })
        ref.current = new FullTextSeachMaterias()
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
    const [id_archivo, setId_archivo] = useState("")



    //full text search materias
    const [materiaSearch, setmateriaSearch] = useState("")


    const handleDeleteFile = (id_archivo, id_materia) => {
        Archivos.DeleteFromMaterias(id_materia, id_archivo)

    }

    //Crea una materia en la base de datos
    const handleSumbitMateria = () =>{
        Materias.CreateMaterias(materia)
    }

    const handleSubitProfesor = ()=>{
        Profesores.CreateProfesor(profesor)
    }


    //handle file obtained in the form
    const handleFileChange = (e) => {
        let file = e.target.files[0];
        setfile(file)
    }

    //sube un archivo a la base de datos
    const handleSsubmitArchivo = () => {
        Archivos.crearArchivos(id_materia, descripcion, profesor, semestre, usuario, categorias, file)

    }


    //funcion que crea un nuevo objeto Materia, esta tiene los atributos id_materia, descripcion, profesor, semestre, usuario, categorias
    const handleMateriaCreation = () => {
        console.log(new Materias(id_materia))

    }

    const handleSearchClick = () => {
        console.log(ref.current.queryData(materiaSearch))
    }

    const handleTypeSearch = (e) => {
        setmateriaSearch(e.target.value)

    }

    return (
        <div style = {{backgroundColor : "white"}}>
            <h2>Crear materia</h2>
            <form action="submit">
                <label htmlFor="materia"/>
                <input type="text" name="" id="materia" placeholder ="Nombre de la materia" onChange = {e=>{setmateria(e.target.value)}}/>
                <input type="button" value="Crear materia" on onClick = {handleSumbitMateria}/>
            </form>
            <br/>

            <h2>Materias disponibles</h2>
            {Object.entries(listaMaterias).map((val) => {
                return <pre>{`${val} `}</pre>
            })}

            <h2>Subir archivo</h2>
            <form>
                <label htmlFor="Materia"/>
                <input type="text" name="" id="Materia" placeholder = "ID_Materia" onChange = {e=>{setid_materia(e.target.value)}}/>


                <label htmlFor="Profesor"/>
                <input type="text" name="" id="Profesor" placeholder = "Profesor" onChange = {e=>{setprofesor(e.target.value)}}/>

                <label htmlFor="Semestre"/>
                <input type="text" name="" id="Semestre" placeholder ="Semestre" onChange = {e=>{setsemestre(e.target.value)}}/>

                <label htmlFor="Categorias"/>
                <input type="text" name="" id="Categorias" placeholder = "Categorias" onChange = {e=>{setcategorias(e.target.value)}}/>

                <label htmlFor="Descripcion"/>
                <input type="text" name="" id="Descripcion" placeholder = "Descripcion" onChange = {e=>{setdescripcion(e.target.value)}}/>

                <label htmlFor="ID_usuario"/>
                <input type="text" name="" id="ID_usuario" placeholder = "ID_usuario" onChange = {e=>{setusuario(e.target.value)}}/>

                <input type="file" name="" id="File"  onChange = {handleFileChange}/>


                <input type="button" value="Subir archivo" onClick = {handleSsubmitArchivo}/>
            </form>

            <br/>

            <h2>Buscar materia</h2>
            <form action="">
                <input type="text" placeholder = "ID Materia" onChange = {e=>{setid_materia(e.target.value)}}/>
                <input type="button" value="Crear clase Materia" onClick = {handleMateriaCreation}/>
            </form>


            <h2>Full Text Search Materias</h2>
            <form action="">
                <input type="text" placeholder = "ID Materia" value = {materiaSearch} onChange = {handleTypeSearch}/>
                <input type="button" value="Buscar materia" onClick = {handleSearchClick}/>
            </form>

            <h2>lista profesores</h2>
            <button onClick = {()=>{console.log(Profesores.getProfesoresList())}}>Obtener profesores</button>

            <h2>Añadir profesor</h2>
            <form>
                <input type="text" name="" id="Profesor" placeholder = "Profesor" onChange = {e=>{setprofesor(e.target.value)}}/>
                <input type="button" value="Buscar materia" onClick = {handleSubitProfesor}/>
            </form>

            <h2>Full Text Search Materias</h2>
            <form action="">
                <input type="text" placeholder = "ID Materia" value = {materiaSearch} onChange = {handleTypeSearch}/>
                <input type="text" placeholder = "ID Archivo" value = {id_archivo} onChange = {(e)=>{setId_archivo( e.target.value)}}/>
                
                <input type="button" value="Eliminar archivo" onClick = {handleDeleteFile}/>
            </form>
        </div>
    )
}

export default Admin
