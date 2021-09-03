import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

/**
 * For creating an alert when the file has an error or is correctly uploaded
 * @param {Boolean} open open the alert message 
 * @param {Function} setOpen to change the open status
 * @param {String} kind one of  ("error", "warning", "info", "success")
 * @param {String} Childrens texto to show up
 * @returns 
 */
export default function AlertMessage({open, setOpen, kind = "error", children}) {
  

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (        
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity= {kind}>
          {children}
        </Alert>        
      </Snackbar>                
  );
}