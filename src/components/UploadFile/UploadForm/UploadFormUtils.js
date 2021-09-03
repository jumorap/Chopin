export const stylesUploadFrom = {
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
  }


  /**
   * Elimina file, categoria, grade, calificado, descpripcion of the formValue state
   * @param {*} formValues current form value state
   * @param {*} setFormValues set value for the current form value state
   */
  export const deleteValues = (formValues, setFormValues) => {
    const formValuesCopy = {...formValues}

    formValuesCopy.file = null
    formValuesCopy.categoria = null
    formValuesCopy.descripcion = null
    formValuesCopy.grade = ""
    formValuesCopy.calificado = false
    setFormValues(formValuesCopy)
  }

  export const errorsStateDefaultValue = {
    materia : false,
    profesor : false,
    semestre : false,
    categoria : false,    
    file : false,
    grade : false    
  }


  /**
   * Add or edit an existing value in an object
   * @param {*} setFormValues set for the object state
   * @param {*} newValue value to be added, must be in the form {param : any} where param is the value to be edited
   */
  export const addValue = (setFormValues, newValue) => {
    setFormValues(prev => {
      return({...prev, ...newValue})
    })
  }


export const semestres = [
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
  
export const categorias = [
    "Parcial",
    "Taller",
    "Quíz",
    "Laboratorio",
    "Guía",
];
  
  