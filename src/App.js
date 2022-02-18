import React, { useState } from 'react';
import Login from "./view/Login";
import Admin from "./view/Admin";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Terms from './view/Terms'
import Course from "./view/Course";
import { createContext, useEffect } from 'react';
import ContextProvider from './contextProvider/ContextProvider';
import { AuthProvider } from "./firebase/firebaseAuthPersistence/AuthProvider";
import PrivateRoute from "./firebase/firebaseAuthPersistence/PrivateRoute";
import UploadFileModal from './components/UploadFile/UploadFileModal';
import { firebaseAnalytics } from "./firebase/firebaseConfig";


export const contextProvider = createContext(undefined)

function App() {

    /*Google analytics*/
    useEffect(() => {
        firebaseAnalytics.logEvent("homepage_visited")
    })

    /* upload file modal status */
    const [uploadFileModalOpen, setUploadFileModalOpen] = useState({open: false, isEditing: false});
    
    
    function toggleUploadFileModal(isEditing = false){
        setUploadFileModalOpen({isEditing , open : !uploadFileModalOpen.open});
    };

    return (
        <>
            <ContextProvider>
                <Router>
                    <AuthProvider>
                        <PrivateRoute exact path="/materias/:idMateria" component={
                            <Course toggleUploadFileModal={toggleUploadFileModal} />
                        }/>

                        <Route exact path="/" >
                            <Login toggleUploadFileModal={toggleUploadFileModal} />
                        </Route>
                    </AuthProvider>

                    <Route exact path="/legal">
                        <Terms/>
                    </Route>
                </Router>

                <UploadFileModal uploadFileModalOpen={uploadFileModalOpen} toggleUploadFileModal={toggleUploadFileModal} />
            </ContextProvider>
        </>
    )
}

export default App;
