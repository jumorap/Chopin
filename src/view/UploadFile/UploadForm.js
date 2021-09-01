import React, { useState } from "react";
import "./uploadForm.css";
import { Button, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MyDropzone from "./DropZone";
import InputText from "./InputText";
import { useMaterias, useProfesores, useMateriaMap, useUploadFormContextVariables, formValuesDefault } from "../ContextProvider";
import UploadedFile from "./UploadedFile";
import Archivos from "../../model/Archivos";
import CloseIcon from "@material-ui/icons/Close";
import { firebaseAppAuth } from "../../model/firebaseSelf/firebaseConfig";
import CheckBoxZone from "./CheckBoxZone";


const useStyles = makeStyles(() => ({
  uploadButton: {
    background: "var(--redBoard)",
    "&:hover": {
      backgroundColor: "var(--hoverRedBoard)",
    },
    color: "#FFF",
    borderRadius: 30,
    border: 0,
    padding: "5px 20px",
    width: "80%",
    marginTop: "20px",
  },

  sharemessage: {
    position: "relative",
    textAlign: "center",
    top: "20px",
    fontFamily: "inherit",
    fontSize: "20px",
  },

  closeButton: {
    padding: 0,
  },

  descriptionBox: {
    width: "100%",
    backgroundColor: "white",
    marginTop: "15px",
  },

  warningDropText: {
    color: "#f44336",
    fontSize: "0.75rem",
  },
}));


//**Funcion que crea el formulario para subir el archivo con todos sus campos de texto*/
const UploadForm = ({ handleClose, fileToEdit }) => {
  let user = firebaseAppAuth.currentUser;

  /**List with all the subjects for the Materias field */
  const materias = useMaterias();

  /**List with all the profesors for the profesores field */
  const profesores = useProfesores();

  /**The conection with the provider to check the existence of the subject */
  const [materiaMap, setMateriaMap] = useMateriaMap();
  
  /**boolean value that disable the input of the form when the file is been uploaded */
  const [formToUploadActive, setFormToShare] = useState(false)

  const classes = useStyles();

  /** React state that has the from values, like profesor, universidad, descripcion */
  const [formValues, setFormValues] = useUploadFormContextVariables()  



  const deleteValues = () => {
    console.log("deleted all")
    setFormValues(formValuesDefault)
  }

  const addValue = (setFormValues, newValue) => {
    setFormValues(prev => {
      return({...prev, ...newValue})
    })
  }
  
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
  
  const [formError, setFormError] = useState({
    materia : false,
    profesor : false,
    semestre : false,
    categoria : false,    
    file : false,
    grade : false    
  });
              
  const handleSubmit = async () => {
    let errors = false; //if true then there are empty spaces in the form    
    const categorias = ["file","materia", "profesor", "semestre", "categoria"]    
    
    //search wheater a form value is empty and add an error if is needed
    categorias.forEach(categoria => {
      if(formValues[categoria] === null || formValues[categoria].length === 0){ //check if is empty
        addErrorValue({[categoria] : true}) 
        errors = true
      }
    })        

    //if a field is not complete cancels the operation
    if(errors){
      return
    }
    
    //disable the input fields
    setFormToShare(true)
    
/*     let nota = grade
    if(nota.length === 1){      
      nota += ".0" 
      setgrade(nota)
    } */

    
       const newArchivo = await Archivos.crearArchivos(
        formValues.materia.id,
        formValues.descripcion,
        formValues.profesor,
        formValues.semestre,
        user.uid,
        formValues.categoria,
        formValues.file,
        formValues.grade,
        formValues.calificado
      );
      
      materiaMap.add_archivo(newArchivo) 
      deleteValues(); 
      console.log(formValues)

      handleClose();  
  };

  console.log(formValues)
  console.log(formError)

  return (
    <div className="container">
      <div className={classes.sharemessage}>
        {fileToEdit ? "Editar" : "Compartir"}
      </div>
      <IconButton className={`${classes.closeButton} close-button`} onClick={handleClose}>
        <CloseIcon />
      </IconButton>

      <div className="upload-form">
        <div className="modal-sub-container">
          <div className="modal-left-div">
            <InputText
              label={"materia"}
              options={materias}
              optionLabel={"materia"}              
              defaultValue={formValues.materia}
              setOption={addFormValue}
              errorState={formError}
              setError={addErrorValue}
              disableInput={formToUploadActive}
            />
            <InputText
              label={"profesor"}
              options={profesores}              
              defaultValue={formValues.profesor}
              setOption={addFormValue}
              errorState={formError}
              setError={addErrorValue}
              disableInput={formToUploadActive}
            />
            <div className="semetre-categoria">
              <InputText
                label={"semestre"}
                options={semestres}                
                defaultValue={formValues.semestre}
                setOption={addFormValue}
                errorState={formError}
                setError={addErrorValue}
                disableInput={formToUploadActive}
              />
              <InputText
                label={"categoria"}
                options={categorias}                
                defaultValue={formValues.categoria}
                setOption={addFormValue}
                errorState={formError}
                setError={addErrorValue}
                disableInput={formToUploadActive}
              />
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
              disabled={formToUploadActive}
            />
          </div>
          <div className="modal-right-div">
            <p>
              Puedes comprimir tus PDF en&nbsp;
              <a href={"https://www.ilovepdf.com/compress_pdf"}
                 rel={"noreferrer"}
                 target={"_blank"}
                 style={{color: "#000", fontWeight: "bold",}}
              >
                ilovepdf.com
              </a>
            </p><br/>
            {formValues.file === null ? (
              <MyDropzone setFile={addFormValue} setFileError = {addErrorValue}/>
            ) : (
              <UploadedFile fileName={formValues.file.name} setFile={addFormValue} disabledButton={formToUploadActive}/>
            )}
            {formError.file === true ? (
                <p className={classes.warningDropText}>
                  Por favor anexe un archivo
                </p>
            ) : (
                <></>
            )}
            
            {/* para colocar si esta resulto o no y la nota */}
            <CheckBoxZone 
              calificado={formValues.calificado}
              setCalificado={addFormValue}
              grade={formValues.grade}
              setgrade={addFormValue}
              gradeError={formError.grade}
              setgradeError={addErrorValue}
              disabledChek={formToUploadActive}
            />

          </div>
        </div>
        <Button
          variant="contained"
          className={classes.uploadButton}
          onClick={handleSubmit}
          disabled={formToUploadActive}
        >
          {fileToEdit ? "Editar" : "Compartir"}
        </Button>
      </div>
    </div>
  );
};

export default UploadForm;

const semestres = [
  "2021-2",
  "2021-1",
  "2020-2",
  "2019-1",
  "2018-2",
  "2017-1",
  "2016-2",
  "2016-1",
  "2015-2",
  "2015-1",
  "2014-2",
  "2014-1",
  "2013-2",
  "2013-1",
];

const categorias = [
  "Parcial",
  "Taller",
  "Quíz",
  "Laboratorio",
  "Guía",
];
