import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  textField: {
    backgroundColor: "white",
    fontSize: "7px"
  },
  container: {
    marginTop: "1em",
  },
}));

/** Componente que genera un label de seleccion multiple y con autocompletado de texto
 * @param {label } string  label que se mostrara para el input y lo marcara en la parte superior
 * @param {options} array[obj] arreglo con los obejetos que se van a mostrar en las opciones del input
 * @param {optionLabel} string valor del arreglo que contiene el label que se desea mostrar, ejemplo
 * [{materia: Ingesoft, codigo: dasodin21}, {materia: Ingesoft, codigo: dasodin21}], en este caso se
 * desea mostrar la materia por la tanto se debe pasar "materia"
 * @param {setOption} React.setAction funcion que cambia el estado del state para almacenar el valor de ese textField
 * @param {errorState} bool identifica si hay algun error, de ser true indica que hay error, flase que no
 * @param {setError} React.setAction funcion que cambia el estado del error
 *
 * @returns
 */
const InputText = ({
  label,
  options,
  optionLabel,
  defaultValue,  
  setOption,
  errorState,
  setError,
}) => {
  const classes = useStyles();

  return (
    <Autocomplete
      id={`combo-box-${String(optionLabel)}`}      
      options={options}
      getOptionLabel={(option) => option[optionLabel]}
      style={{ width: "100%" }}
      inputValue = {defaultValue}            
      renderInput={(params) => (
        <TextField
          className={classes.textField}
          {...params}
          error={errorState}
          helperText={errorState ? "Este campo no puede estar vacio" : ""}
          label={label}
          variant="outlined"                   
        />
      )}
      className={classes.container}
      onChange={(event, newValue) => {
        setOption(newValue)
        setError(false)
      }}      
      
    />
  );
};

export default InputText;
