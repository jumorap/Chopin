import React from 'react';
import Modal from "@material-ui/core/Modal";
import UploadForm from "./UploadForm";

let UploadFileModal = ({ open, toggle, file }) => (    
        <Modal
            open={open}
            onClose={toggle}
            className={"ModalWindow"}
        >
            <div>
                <UploadForm handleClose={toggle} fileToEdit={file} />
            </div>
        </Modal>    
);

export default UploadFileModal;