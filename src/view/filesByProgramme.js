import React, { useState } from 'react';
import "./css/pdfViewer.css"
import { Modal, Button} from "@material-ui/core";


export function FilesByProgramme() {
    const [modal, setModal] = useState(false);
    const openAndClose = () => {
        setModal(!modal)
    }

    const body = (
        <div className={"modal"}>
            <div align='center' className={"pdf-container"}>
                    <object
                        data={'https://firebasestorage.googleapis.com/v0/b/red-board-70d99.appspot.com/o/UNIVERSIDAD_NACIONAL%2FMaterias%2FxmLGdb0H239zeZGezOje%2F0hMDLqhQxOTX3rps8Bnd?alt=media&token=4ce282f3-fa1b-49ae-b5ae-19e23a36789a'}
                        type="application/pdf"
                        width="100%"
                        height="100%">
                    </object>
                </div>
        </div>
    )

    return(
        <div className={"container"}>
            <br />
            
            <Button onClick={() => openAndClose()}>ARCHIVO X</Button>
            <Modal open={modal} onClose={openAndClose}>
                {body}
            </Modal>

        </div>
    )

}

/*export function FilesByProgramme() {
    return(
        <div className={"general-container"}>
            <div className={"left-container"}>
                <p>HOLA</p>
            </div>
            <div className={"pdf-container"}>
                <object
                data={'https://firebasestorage.googleapis.com/v0/b/red-board-70d99.appspot.com/o/UNIVERSIDAD_NACIONAL%2FMaterias%2FxmLGdb0H239zeZGezOje%2F0hMDLqhQxOTX3rps8Bnd?alt=media&token=4ce282f3-fa1b-49ae-b5ae-19e23a36789a'}
                type="application/pdf"
                width="100%"
                height="100%">
                </object>
            </div>
            <div className={"right-container"}>
                <p>HOLA</p>
            </div>
        </div>
    )
}
*/