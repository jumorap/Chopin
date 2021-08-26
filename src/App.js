import './App.css';
import React, { useState } from 'react';
import Login from "./view/Login";
import Admin from "./view/Admin";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Terms from './view/Terms'
import ProgrammeResults from "./view/ProgrammeResults";
import { createContext, useEffect } from 'react';
import ContextProvider from './view/ContextProvider';
import { AuthProvider } from "./model/firebaseAuthPersistence/AuthProvider";
import PrivateRoute from "./model/firebaseAuthPersistence/PrivateRoute";
import UploadFileModal from './view/UploadFile/UploadFileModal';
import { firebaseAnalytics } from "./model/firebaseSelf/firebaseConfig";


export const contextProvider = createContext(undefined)

function App() {

    /*Google analytics*/
    useEffect(() => {
        firebaseAnalytics.logEvent("homepage_visited")
    })

    /* upload file modal status */
    const [uploadFileModalOpen, setUploadFileModalOpen] = useState(false);
    
    /* file to edit */
    const [fileToEdit, setFileToEdit] = useState(undefined);
    
    let toggleUploadFileModal = () => {
        setUploadFileModalOpen(!uploadFileModalOpen);
        fileToEdit && setFileToEdit(undefined);
    };

    return (
        <>
            <ContextProvider>
                <Router>
                    <AuthProvider>
                        <PrivateRoute exact path="/materias/:idMateria" component={
                            <ProgrammeResults toggleUploadFileModal={toggleUploadFileModal} setFileToEdit={setFileToEdit} />
                        }/>

                        <Route exact path="/" >
                            <Login toggleUploadFileModal={toggleUploadFileModal} />
                        </Route>
                    </AuthProvider>

                    <Route exact path="/legal">
                        <Terms/>
                    </Route>                    
                </Router>

                <UploadFileModal open={uploadFileModalOpen} toggle={toggleUploadFileModal} file={fileToEdit} />
            </ContextProvider>
        </>
    )
}

export default App;
