import React, { useEffect, useState } from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';


//Muestra un check box saber si tiene la nota y si este es activado muestra la opcio para colocarla
const CheckBoxZone = ({grade, setgrade, gradeError, setgradeError, calificado, setCalificado}) => {        

    //handle when the checkbox is pressed
    const handleCheckBox = ()=>{        
        setCalificado(prev => !prev)
        setgradeError(false)        
        setgrade("")
    }
    
    return (
        <div>            
            <center>
            <FormControlLabel
                control={
                <Checkbox
                    checked={calificado}
                    onChange={handleCheckBox}
                    name="Resuleto"
                    color="primary"
                />
                }
                label="¿Está resuelto?"
            />

            {calificado && <Grade grade = {grade} setGrade = {setgrade} error = {gradeError} setError = {setgradeError}/>}
            </center>
        </div>
    )
}


//To write the grade if is necessary
const Grade = ({grade, setGrade, error, setError}) => {
                
    useEffect(() => {
        if(grade > 5 | 0 > grade){ //notificar valores errados
            setError(true)
            return
        }
        if( 5 >= grade >= 0 ){ //notificar valores errados
            setError(false)
            return
        }
    }, [grade])
    
    //when is written ovet the grade field text
    const handleChange = (e)=>{
        const value = e.target.value        
        if(isNaN(value)){ //only accept numerical values
            return
        }                 
        setGrade(e.target.value)
    } 


    return (
        <><br/>
        <TextField
          error = {error}
          id="grade-text"
          label="Nota obtenida"
          defaultValue={""}
          value = {grade}
          onChange = {handleChange}
          helperText= {error && "La nota maxima es 5"}
          variant= "outlined"
        />
        </>
    )
}

export default CheckBoxZone