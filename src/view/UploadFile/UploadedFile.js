import React from 'react'
import "../css/uploadedFile.css"
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';

const UploadedFile = ({file, setFile}) => {
    const handleClose = ()=>{
        setFile(null)
    }

    return (
        <div className={"uploaded-container"}>
            <div className="pdf-circle">
                PDF
            </div>

            <span className={"text-max-pdf"}>
                {file.name}
            </span>

            <IconButton onClick={handleClose}>
                <CloseIcon className = "close-icon"/>
            </IconButton>
        </div>
    )
}

export default UploadedFile
