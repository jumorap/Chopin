import React, { createContext, useContext, useEffect, useState } from 'react'
import Materias from '../model/Materias'


//create the context object 
//read the subjects and create the list with those




const dataContext = createContext()

export function useMaterias(){
    return useContext(dataContext)        
}

const ContextProvider = ({ children }) => {

    const [listaMaterias, setlistaMaterias] = useState([])


    
    useEffect(() => {
        Materias.getMateriasList()
        .then(value => {
            setlistaMaterias(value)                
        })                              
    }, [])

    const contextValue = {
        materias : listaMaterias,
        profesores : ""
    }
    
        
    return (
        <dataContext.Provider value = {listaMaterias}>
            {children}
        </dataContext.Provider>
    )
}



export default ContextProvider
