import React, { useContext, useState } from 'react'

import "../css/uploadForm.css"
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import MyDropzone from "./DropZone"
import InputText from './InputText';
import {useMaterias, useProfesores} from ".././ContextProvider"
import UploadedFile from './UploadedFile';

const materiasProv = 
[
    {title: "Ingnieria de software", ID:"19283y"},
    {title: "Arquitectura de software", ID:"19283y"},
    {title: "Ingnieria de software 2", ID:"19283y"},
    {title: "Ingnieria economica", ID:"19283y"},
    {title: "Ingnieria de gatos", ID:"19283y"},
    {title: "Introduccion a los estudios de genero y anatomicos de personas", ID:"19283y"},
]

const semestres = [
    {semestre : "2021-2"},
    {semestre : "2021-1"},
    {semestre : "2020-2"},
    {semestre : "2019-1"},
    {semestre : "2018-2"},
    {semestre : "2017-1"},
    {semestre : "2016-2"},
    {semestre : "2015-1"},
]

const categorias = [
    {categoria: "Parcial 1"},
    {categoria: "Parcial 2"},
    {categoria: "Parcial 3"},
    {categoria: "Parcial 4"},
    {categoria: "Parcial 5"},
    {categoria: "Parcial 7"},
    {categoria: "Parcial 8"},
    {categoria: "Parcial 9"},
    {categoria: "Taller 1"},
    {categoria: "Taller 2"},
    {categoria: "Taller 3"},
    {categoria: "Taller 4"},
    {categoria: "Taller 5"},
    {categoria: "Taller 6"},
    {categoria: "Taller 7"},
    {categoria: "Taller 8"},
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
    
    
    const materias = useMaterias()
    const profesores = useProfesores()
            
    const classes = useStyles()

    const [materiaText, setmateriaText] = useState("")
    const [profesorText, setProfesorText] = useState("")
    const [semestreText, setSemestreText] = useState("")
    const [categoriaText, setcategoriaText] = useState("")
    const [file, setfile] = useState(null)

    const [materiaError, setmateriaError] = useState(false)
    const [profesorError, setProfesorError] = useState(false)
    const [semestreError, setSemestreError] = useState(false)
    const [categoriaError, setcategoriaError] = useState(false)
    const [fileError, setfileError] = useState(false)

    
    
    const handleSubmit = () => {
        console.log(materiaText)
        console.log(profesorText)
        console.log(semestreText)
        console.log(categoriaText)
        console.log(file)

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
        if(file === null){
            setfileError(true)
            errors = true
        }


        if(!errors){
            console.log("no hay erroes")            
        }

    }


    return (
        <div className="container">
            <div className="title">
                Comparte
            </div>

            <div className="upload_form">
           
                {
                file === null?
                <MyDropzone setFile = {setfile}/>:
                <UploadedFile file = {file} setFile = {setfile}/>            
                }

                
                <InputText 
                    label = {"Materias"}
                    options = {materias}
                    optionLabel = {"materia"}
                    setOption = {setmateriaText}
                    errorState = {materiaError}
                    setError = {setmateriaError}
                />
                <InputText 
                    label = {"Profesor"}
                    options = {profesores}
                    optionLabel = {"profesor"}
                    setOption = {setProfesorText}
                    errorState = {profesorError}
                    setError = {setProfesorError}
                />
                <InputText 
                    label = {"Semestre"}
                    options = {semestres}
                    optionLabel = {"semestre"}
                    setOption = {setSemestreText}
                    errorState = {semestreError}
                    setError = {setSemestreError}
                />
                <InputText 
                    label = {"Categoria"}
                    options = {categorias}
                    optionLabel = {"categoria"}
                    setOption = {setcategoriaText}
                    errorState = {categoriaError}
                    setError = {setcategoriaError}
                />
                
                

            <Button variant="contained" className = {classes.uploadButton} onClick = {handleSubmit}>Compartir</Button>
            
            </div>

        </div>
    )
}

export default UploadForm
