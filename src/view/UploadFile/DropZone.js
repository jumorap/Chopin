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
          <p>Suelta el PDF aca ...</p> :
          <p>Arrastra el documento aca, o da click para buscarlo</p>
      }
    </div>
  )
}

export default MyDropzone