import React from 'react';
import Modal from "@material-ui/core/Modal";
import UploadForm from "./UploadForm/UploadForm";

let UploadFileModal = ({ uploadFileModalOpen, toggleUploadFileModal }) => (    
        <Modal
            open={uploadFileModalOpen.open}
            onClose={toggleUploadFileModal}
            className={"modal-window"}
        >
            <div>
                <UploadForm uploadFileModalOpen = {uploadFileModalOpen} handleClose={toggleUploadFileModal} />
            </div>
        </Modal>    
);

export default UploadFileModal;