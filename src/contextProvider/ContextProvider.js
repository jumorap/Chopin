import React, { createContext, useContext, useEffect, useState, useRef } from 'react'
import FullTextSearch from '../components/SearchBar/FullTextSearch'
import MateriasView from './MateriasView'
import Materias from '../firebase/Materias'
import Profesores from '../firebase/Profesores'


//create the context object 
//read the subjects and create the list with those


const materiasContext = createContext() //lista de materias para la nav bar y el añadir archivo
const profesoresContext = createContext()
const fullTextSearchContext = createContext()
const materiaContext = createContext() //Objeto con todas las materias
const uploadFormContextVariables = createContext()

/**
 * Retorns an object with the values of the upload form
 * @returns Map(IdMateria<String>, Materia<Obj>)
 */
export function useUploadFormContextVariables() {
    return useContext(uploadFormContextVariables)
}


/**
 * Retorns an Map with key the id of the materia and value an Object with The atributs of Materia
 * @returns Map(IdMateria<String>, Materia<Obj>)
 */
export function useMateriaMap() {
    return useContext(materiaContext)
}


/**Returns a list with al the "Materias"
 * @returns Array[{id: <string>, materias: <string>}]
*/
export function useMaterias() {
    return useContext(materiasContext)
}

/**
 * Returns a list with al the "Profesores"
 * @returns Array[{id: <string>, profesor: <string>}]
 */
export function useProfesores() {
    return useContext(profesoresContext)
}

/**
 * Returns an FullTextSearch objetc 
 * @returns FullTextSearch
 */

export function useFullTextSearch() {
    return useContext(fullTextSearchContext)
}

export const formValuesDefault = {
    materia : null,
    profesor : null,
    semestre : null,
    categoria : null,
    descripcion : null,
    file : null,
    grade : "",
    calificado : false,
}

const ContextProvider = ({ children }) => {

    const [listaMaterias, setlistaMaterias] = useState([])
    const [listProfesores, setlistProfesores] = useState([])
    const [fullTextSearchMaterias, setfullTextSearchMaterias] = useState()
    const [mapMaterias, setmapMaterias] = useState(new MateriasView())
    
    
    const [formValues, setFormValues] = useState(formValuesDefault);

    const firstRender = useRef(true)

    useEffect(() => {

        if (firstRender) {
            Materias.getMateriasList()
                .then(value => {
                    setlistaMaterias(value)
                    setfullTextSearchMaterias(new FullTextSearch(value))
                })
            Profesores.getProfesoresList()
                .then(value => {                    
                    setlistProfesores(value)
                })
            firstRender.current = false
        }

    }, [])

    useEffect(() => {
        console.log("UPDATED")
    }, [mapMaterias])

    return (
        <materiaContext.Provider value={[mapMaterias, setmapMaterias]}>
            <fullTextSearchContext.Provider value={fullTextSearchMaterias}>
                <profesoresContext.Provider value={listProfesores}>
                    <materiasContext.Provider value={listaMaterias}>                        
                        <uploadFormContextVariables.Provider value={[formValues, setFormValues]}>
                            {children}
                        </uploadFormContextVariables.Provider>
                    </materiasContext.Provider>
                </profesoresContext.Provider>
            </fullTextSearchContext.Provider>
        </materiaContext.Provider>
    )
}



export default ContextProvider
