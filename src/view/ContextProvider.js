import React, { createContext, useContext, useEffect, useState } from 'react'
import Materias from '../model/Materias'
import Profesores from '../model/Profesores'


//create the context object 
//read the subjects and create the list with those




const materiasContext = createContext()
const profesoresContext = createContext()

export function useMaterias(){
    return useContext(materiasContext)        
}

export function useProfesores(){
    return useContext(profesoresContext)    
}

const ContextProvider = ({ children }) => {

    const [listaMaterias, setlistaMaterias] = useState([])
    const [listProfesores, setlistProfesores] = useState([])
            

    useEffect(() => {        
        Materias.getMateriasList()
        .then(value => {
            setlistaMaterias(value)                
        })                              
        Profesores.getProfesoresList()
        .then(value=>{
            setlistProfesores(value)
        })
    }, [])
        
        
    return (
        <profesoresContext.Provider value = {listProfesores}>
        <materiasContext.Provider value = {listaMaterias}>
            {children}
        </materiasContext.Provider>
        </profesoresContext.Provider>
    )
}



export default ContextProvider
