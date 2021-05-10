import React, { useState } from 'react'

import "../css/uploadForm.css"
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import Materias from '../../model/Materias';
import MyDropzone from "./DropZone"

const materias = 
[
    {title: "Ingnieria de software", ID:"19283y"},
    {title: "Arquitectura de software", ID:"19283y"},
    {title: "Ingnieria de software 2", ID:"19283y"},
    {title: "Ingnieria economica", ID:"19283y"},
    {title: "Ingnieria de gatos", ID:"19283y"},
    {title: "Introduccion a los estudios de genero y anatomicos de personas", ID:"19283y"},
]

const semestres = [
    "2021-2",
    "2021-1",
    "2020-2",
    "2019-1",
    "2018-2",
    "2017-1",
    "2016-2",
    "2015-1",
]

const categorias = [
    "Parcial 1",
    "Parcial 2",
    "Parcial 3",
    "Parcial 4",
    "Parcial 5",
    "Parcial 7",
    "Parcial 8",
    "Parcial 9",
    "Taller 1",
    "Taller 2",
    "Taller 3",
    "Taller 4",
    "Taller 5",
    "Taller 6",
    "Taller 7",
    "Taller 8",
]


const useStyles = makeStyles((theme) => ({
    uploadButton : {
        backgroundColor: "#AA0000",
        color: "white",
        borderRadius : "50px",
        width : "80%",
    }
}))

const UploadForm = () => {
    
    const classes = useStyles()

    const [materiaText, setmateriaText] = useState("")
    const [profesorText, setProfesorText] = useState("")
    const [semestreText, setSemestreText] = useState("")
    const [categoriaText, setcategoriaText] = useState("")

    const [materiaError, setmateriaError] = useState(false)
    const [profesorError, setProfesorError] = useState(false)
    const [semestreError, setSemestreError] = useState(false)
    const [categoriaError, setcategoriaError] = useState(false)

    
    
    const handleSubmit = () => {
        console.log(materiaText)
        console.log(profesorText)
        console.log(semestreText)
        console.log(categoriaText)

        let errors = false

        if(materiaText === null || materiaText.length === 0){
            setmateriaError(true)
            errors = true
        }
        if(profesorText === null || profesorText.length === 0){
            setProfesorError(true)
            errors = true
        }
        if(semestreText === null || semestreText.length === 0){
            setSemestreError(true)
            errors = true
        }
        if(categoriaText === null || categoriaText.length === 0){
            setcategoriaError(true)
            errors = true
        }

/*         if(!errors){

        } */
    }


    return (
        <div className="container">
            <div className="title">
                Comparte
            </div>

            <div className="upload_form">
           
                <MyDropzone>

                </MyDropzone>

                <Autocomplete
                    id="combo-box-materias"
                    options={materias}
                    getOptionLabel={(option) => option.title}                    
                    style={{ width: 300 }}                    
                    renderInput={(params) => <TextField {...params}   error = {materiaError} helperText = {materiaError?"Este campo no puede estar vacio":""} label="Materia" variant="outlined"/>}
                    className="TextField"
                    onChange={(event, newValue) => {setmateriaText(newValue);setmateriaError(false)}}
                />
                <Autocomplete
                    id="combo-box-profesor"
                    options={materias}
                    getOptionLabel={(option) => option.title}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} error = {profesorError} helperText = {profesorError?"Este campo no puede estar vacio":""} label="Profesor" variant="outlined" />}
                    className="TextField"
                    onChange={(event, newValue) => {setProfesorText(newValue);setProfesorError(false)}}
                />                
                <Autocomplete
                    id="combo-box-semestre"
                    options={semestres}
                    getOptionLabel={(option) => option}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} error = {semestreError} helperText = {semestreError?"Este campo no puede estar vacio":""} label="Semestre" variant="outlined" />}
                    className="TextField"
                    onChange={(event, newValue) => {setSemestreText(newValue); setSemestreError(false)}}
                />
                <Autocomplete
                    id="combo-box-categoria"
                    options={categorias}
                    getOptionLabel={(option) => option}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} error = {categoriaError} helperText = {categoriaError?"Este campo no puede estar vacio":""} label="Categoria" variant="outlined"/>}
                    className="TextField"
                    onChange={(event, newValue) => {setcategoriaText(newValue); setcategoriaError(false)}}
                />                
            <Button style={{
                background: '#AA0000',
                borderRadius: 30,
                border: 0,
                padding: '5px 20px',
            }} className={classes.uploadButton} onClick={handleSubmit}>Compartir</Button>
            
            </div>

        </div>
    )
}

export default UploadForm
