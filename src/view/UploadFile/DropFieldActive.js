import { Button, makeStyles } from '@material-ui/core'
import React from 'react'
import { FaFolderPlus } from "react-icons/all";

const useStyles = makeStyles(() => ({
    text: {
        color: "#959595",
        fontWeight: "bold"
    },
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent:"center",
        flexDirection: "column",        
    },
    icon: {
        fontSize: "60px",
    },
    searchFile: {
        background: '#AA0000',
        "&:hover": {
            backgroundColor: "#800000"
        },
        color: '#FFF',
        borderRadius: 30,
        border: 0,
        padding: '5px 20px',
    },
}))
const DropFieldActive = () => {    
    const classes = useStyles()

    return (
        <div className={classes.container}>
            <FaFolderPlus className={classes.icon}/>
            <Button variant="contained" color="primary" className={classes.searchFile}>
                Búscalo
            </Button>   
            <p className = {classes.text}>
                O suelta tu archivo aquí
            </p>         
        </div>
    )
}

export default DropFieldActive
