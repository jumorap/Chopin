import { makeStyles } from '@material-ui/core'
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';


const useStyles = makeStyles((teme)=>({
    container : {
        width : "90%",
        height : "150px",
        backgroundColor: "withe",
        borderRadius : "25px",
        borderStyle: "dashed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center" 
    }
}))

function MyDropzone() {
    
    const classes = useStyles()
  
  
    const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles)
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} className = {classes.container}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <center>Suelta el PDF aca ...</center> :
          <center>Arrastra el documento aca, o da click para buscarlo</center>
      }
    </div>
  )
}

export default MyDropzone