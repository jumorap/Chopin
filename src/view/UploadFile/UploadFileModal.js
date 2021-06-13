import React from 'react';
import Modal from "@material-ui/core/Modal";
import UploadForm from "./UploadForm";
import ContextProvider from "../ContextProvider"

let UploadFileModal = ({ open, toggle, file }) => (
    <ContextProvider>
        <Modal
            open={open}
            onClose={toggle}
            className={"ModalWindow"}
        >
            <div>
                <UploadForm handleClose={toggle} fileToEdit={file} />
            </div>
        </Modal>
    </ContextProvider>
);

export default UploadFileModal;