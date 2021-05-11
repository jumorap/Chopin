import React from 'react'
import { makeStyles } from '@material-ui/core'
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

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
        backgroundColor: "#B85454",
        width: "100%",
        height: "100%",
        borderRadius: "inherit",                     
    },
    icon:{
        
    }    
}))

const DropFIeldDesactive = () => {
    const classes = useStyles()
    return (
        <div className = {classes.container}>
            <PictureAsPdfIcon className = {classes.icon}/>
            <p className = {classes.text}>
                Suelta el archivo
            </p>
        </div>        
    )
}

export default DropFIeldDesactive
