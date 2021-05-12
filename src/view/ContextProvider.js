import React, { createContext, useContext, useEffect, useState, useRef } from 'react'
import FullTextSearch from '../controler/FullTextSearch'
import Materias from '../model/Materias'
import Profesores from '../model/Profesores'


//create the context object 
//read the subjects and create the list with those




const materiasContext = createContext()
const profesoresContext = createContext()
const fullTextSearchContext = createContext()

/**Returns a list with al the "Materias"
 * @returns Array[{id: <string>, materias: <string>}]
*/
export function useMaterias(){
    return useContext(materiasContext)        
}

/**
 * Returns a list with al the "Profesores"
 * @returns Array[{id: <string>, profesor: <string>}]
 */
export function useProfesores(){
    return useContext(profesoresContext)    
}

/**
 * Returns an FullTextSearch objetc 
 * @returns FullTextSearch
 */

export function useFullTextSearch(){
    return useContext(fullTextSearchContext)
}


const ContextProvider = ({ children }) => {

    const [listaMaterias, setlistaMaterias] = useState([])
    const [listProfesores, setlistProfesores] = useState([])
    const [fullTextSearchMaterias, setfullTextSearchMaterias] = useState()

            
    const firstRender = useRef(true)
    
    useEffect(() => {        

        if(firstRender){
            Materias.getMateriasList()
            .then(value => {
                setlistaMaterias(value)  
                setfullTextSearchMaterias(new FullTextSearch(value))                              
            })                              
            Profesores.getProfesoresList()
            .then(value=>{
                setlistProfesores(value)
            })
            firstRender.current = false            
        }
        
    }, [])
        
        
    return (
        <fullTextSearchContext.Provider value = {fullTextSearchMaterias}>        
        <profesoresContext.Provider value = {listProfesores}>
        <materiasContext.Provider value = {listaMaterias}>
            {children}
        </materiasContext.Provider>
        </profesoresContext.Provider>
        </fullTextSearchContext.Provider>
    )
}



export default ContextProvider
