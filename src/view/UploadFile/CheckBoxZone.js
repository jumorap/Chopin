import React, { useEffect, useState } from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';

function validateGrade(grade){
    grade = parseInt(grade)
    if(grade > 50 | 0 > grade){
        return "revise la nota"
    }    
    if(grade > 5){
        grade /= 10
    }



}


//To write the grade if is necessary
const Grade = ({grade, setGrade}) => {
    const [error, setError] = useState(false)

    
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
    
    const handleChange = (e)=>{
        const value = e.target.value        
        if(isNaN(value)){ //solo admintir valores numericos
            return
        }                 
        setGrade(e.target.value)
    } 


    return (
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
    )
}


//Muestra un check box saber si tiene la nota y si este es activado muestra la opcio para colocarla
const CheckBoxZone = () => {
    
    const [checked, setchecked] = useState(false)
    const [grade, setgrade] = useState("")

    return (
        <div>            
            <center>
            <FormControlLabel
                control={
                <Checkbox
                    checked={checked}
                    onChange={()=>{setchecked(prev => !prev)}}
                    name="Resuleto"
                    color="primary"
                />
                }
                label="¿Esta resuleto?"
            />

            {checked && <Grade grade = {grade} setGrade = {setgrade}/>}
            </center>
        </div>
    )
}

export default CheckBoxZone
