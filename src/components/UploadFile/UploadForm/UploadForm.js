import React, { useState } from "react";
import "../../../css/uploadForm.css";
import { Button, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MyDropzone from "../DropZone/DropZone";
import InputText from "../Inputs/InputText";
import { useMaterias, useProfesores, useMateriaMap, useUploadFormContextVariables } from "../../../contextProvider/ContextProvider";
import UploadedFile from "../UploadedFile";
import Archivos from "../../../firebase/Archivos";
import CloseIcon from "@material-ui/icons/Close";
import { firebaseAppAuth } from "../../../firebase/firebaseConfig";
import CheckBoxZone from "../Inputs/CheckBoxZone";
import { addValue, categorias, deleteValues, editValues, errorsStateDefaultValue, semestres, stylesUploadFrom, uploadValues } from "./UploadFormUtils";


//for editing the material ui components styles
const useStyles = makeStyles(() => (stylesUploadFrom));


//**Funcion que crea el formulario para subir el archivo con todos sus campos de texto*/
const UploadForm = ({ handleClose, uploadFileModalOpen }) => {
  let user = firebaseAppAuth.currentUser;

  /**List with all the subjects for the Materias field */
  const materias = useMaterias();

  /**List with all the profesors for the profesores field */
  const profesores = useProfesores();

  /**The conection with the provider to check the existence of the subject */
  const [materiaMap, setMateriaMap] = useMateriaMap();
  
  /**boolean value that disable the input of the form when the file is been uploaded */
  const [disableFormInputs, setFormToShare] = useState(false)

  const classes = useStyles();

  /** React state that has the from values, like profesor, universidad, descripcion */
  const [formValues, setFormValues] = useUploadFormContextVariables()  
      
  /**
   * Add or edit a value in de form value, as profesor, materia, semestre etc while changing the state
   * @param {{parameter : any}} newValue value to be added to the form data state. the key is is the parameter ex: "categotia", "parcial" etc and the value is any and represents the value to be used in the form
   */
  const addFormValue = (newValue) => {
    addValue(setFormValues, newValue)
  }

  /**
   * Add an error to the error state
   * @param {{parameter : boolean}} newError the error to add to the erros state, it has the key is the parameter ex: "categotia", "parcial" etc and the value is an boolean value that indicates if there is an error
   */
  const addErrorValue = (newError) => {
    addValue(setFormError, newError)
  }


  
  const [formError, setFormError] = useState(errorsStateDefaultValue);

  
              
  const handleSubmit = async () => {
    if (uploadFileModalOpen.isEditing) {
      //edita los archivos de la DB
      await editValues(formValues, setFormValues, addErrorValue, setFormToShare, setMateriaMap, user, materiaMap, handleClose)

    } else {
      // sube los valores del formulario a la DB 
      await uploadValues(formValues, setFormValues, addErrorValue, setFormToShare, user, materiaMap, handleClose)
    }
  };

  /**
   * Funcion para generar inputText component
   * @param {String} nombre nombre del parametro que tendra la funcion, ejemplo categoria, profesor, materia
   * @param {*} options lista de opciones para desplegar en el text field
   * @returns
   */
  function getInputText(nombre, options, optionLabel = ""){
    return (
      <InputText
        label={nombre}
        options={options}             
        optionLabel = {optionLabel}   
        defaultValue={formValues[nombre]}
        setOption={addFormValue}
        errorState={formError}
        setError={addErrorValue}
        disableInput={disableFormInputs}
    />
    )
  }


  function PdfZone(){
    return(
      <>
          <p>
            Puedes comprimir tus PDF en&nbsp;
            <a href={"https://www.ilovepdf.com/compress_pdf"}
              rel={"noreferrer"}
              target={"_blank"}
              style={{color: "#000", fontWeight: "bold",}}
            >
              ilovepdf.com
            </a>
          </p>
          <br/>
          {formValues.file === null ? (
            <MyDropzone setFile={addFormValue} setFileError = {addErrorValue}/> 
          ) : (
            <UploadedFile fileName={formValues.file.name} setFile={addFormValue} disabledButton={disableFormInputs}/>
          )}
          {formError.file === true ? (
              <p className={classes.warningDropText}>
                Por favor anexe un archivo
              </p>
          ) : (
              <></>
          )}
      </>
    )
  }


  return (
    <div className="container">
      <div className={classes.sharemessage}>
        {uploadFileModalOpen.isEditing ? "Editar" : "Compartir"}
      </div>
      <IconButton className={`${classes.closeButton} close-button`} onClick={handleClose}>
        <CloseIcon />
      </IconButton>      

      <div className="upload-form">
        <div className={uploadFileModalOpen.isEditing ? "modal-sub-container column" : "modal-sub-container "}>
          <div className="modal-left-div">

            {!uploadFileModalOpen.isEditing && getInputText("materia", materias, "materia")}
            {getInputText("profesor", profesores)}
                        
            <div className="semetre-categoria">
              {getInputText("semestre", semestres)}              
              {getInputText("categoria", categorias)}                            
            </div>
            <TextField
              id="outlined-multiline-static"
              label="Descripción (opcional)"
              multiline
              rows={4}
              variant="outlined"
              className={classes.descriptionBox}
              value={formValues.descripcion}
              onChange={e => addFormValue({descripcion : e.target.value})}
              disabled={disableFormInputs}
            />
          </div>
          <div className="modal-right-div">
            
            {!uploadFileModalOpen.isEditing && <PdfZone/>}
            
            {/* para colocar si esta resulto o no y la nota */}
            <CheckBoxZone 
              calificado={formValues.calificado}
              setCalificado={addFormValue}
              grade={formValues.grade}
              setgrade={addFormValue}
              gradeError={formError.grade}
              setgradeError={addErrorValue}
              disabledChek={disableFormInputs}
            />

          </div>
        </div>
        <Button
          variant="contained"
          className={classes.uploadButton}
          onClick={handleSubmit}
          disabled={disableFormInputs}
        >
          {uploadFileModalOpen.isEditing ? "Editar" : "Compartir"}
        </Button>
      </div>
    </div>
  );
};



export default UploadForm;





