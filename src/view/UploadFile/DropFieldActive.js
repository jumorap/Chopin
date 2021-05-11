import { Button, Container, makeStyles } from '@material-ui/core'
import React from 'react'
import FolderIcon from '@material-ui/icons/Folder';

const useStyles = makeStyles((temes)=>({
    text: {
        color: "#959aa2",
        fontWeight: "bold"
                
    },
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent:"center",
        flexDirection: "column",        
    },
    icon:{
        
    }    
}))
const DropFieldActive = () => {    
    const classes = useStyles()
    return (
        <div className = {classes.container}>
            <FolderIcon fontSize = "large"/>            
            <Button variant ="contained" color = "primary" className = {classes.button}>
                Buscalo
            </Button>   
            <p className = {classes.text}>
                O suelta el archivo aca    
            </p>         
        </div>
    )
}

export default DropFieldActive
