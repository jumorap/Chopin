import React from "react"
import { makeStyles } from "@material-ui/core/styles";
import LoadingIcons from 'react-loading-icons'


export default function Loading() {

    const useStyles = makeStyles( () => ({
        loading: {
            color: "#FFF",
            fontSize: "110px",
        },
        loadingContainer: {
            position: "absolute",
            top: "45%",
            width: "100%",
            alignContent: "center"
        }
    }))

    return (
        <center className={useStyles().loadingContainer}>
            <LoadingIcons.ThreeDots className={useStyles().loading}/>
        </center>
    )
}


