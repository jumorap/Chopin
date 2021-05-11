import { makeStyles } from '@material-ui/core'
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import FolderIcon from '@material-ui/icons/Folder';
import DropFieldActive from './DropFieldActive';
import DropFIeldDesactive from './DropFIeldDesactive';

const useStyles = makeStyles((teme)=>({
    container : {
        width : "90%",
        height : "150px",
        backgroundColor: "withe",
        borderRadius : "25px",
        borderStyle: "dashed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white"
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
          <DropFIeldDesactive/>:
          <DropFieldActive/>
          
      }
    </div>
  )
}

export default MyDropzone