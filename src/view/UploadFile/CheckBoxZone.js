import React, { useEffect } from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';


//Muestra un check box saber si tiene la nota y si este es activado muestra la opcion para colocarla
const CheckBoxZone = ({grade, setgrade, gradeError, setgradeError, calificado, setCalificado, disabledChek}) => {
    
    //handle when the checkbox is pressed
    const handleCheckBox = ()=>{        
        setCalificado({calificado: !calificado})        
        setgradeError({grade : false})        
        setgrade({grade : ""})
    }
    
    return (
        <div>            
            <center>
            <FormControlLabel
                control={
                <Checkbox
                    checked={calificado}
                    onChange={handleCheckBox}
                    name={"Resuleto"}
                    color={"primary"}
                    disabled={disabledChek}
                />
                }
                label={"¿Está resuleto?"}
            />

            {calificado && <Grade grade={grade} setGrade={setgrade} error={gradeError} setError={setgradeError} disabledInput={disabledChek}/>}
            </center>
        </div>
    )
}


/**
 * Field zone para colocar la nota
 * @param grade
 * @param setGrade 
 * @param setError
 * @param disabledInput bool boolean value to disable the option of adding a grade
 * @returns {JSX.Element}
 * @constructor
 */
const Grade = ({grade, setGrade, error, setError, disabledInput}) => {
                
    useEffect(() => {        
        if(grade === ""){
            setError({grade : false})
            return
        }        

        if(grade > 5 | 0 > grade){ //notificar valores errados
            console.log("error here")
            setError({grade : true})
            return
        }        
        
        setError({grade : false})
        
    }, [grade])
    
    //when is written ovet the grade field text
    const handleChange = (e)=>{
        const value = e.target.value           
        if(isNaN(value) || 3 < value.length ){ //only accept numerical values
            return
        }                 
        setGrade({grade : value})
    } 


    return (
        <><br/>
        <TextField
          error={error}
          id={"grade-text"}
          label={"Calificación (opcional)"}
          defaultValue={""}
          autoComplete={"off"}
          value={grade}
          onChange={handleChange}
          helperText={error && "La nota maxima es 5.0"}
          variant="outlined"
          style={{backgroundColor: "#FFF",}}
          disabled={disabledInput}
        />
        </>
    )
}

export default CheckBoxZone