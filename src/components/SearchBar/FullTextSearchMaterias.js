import Materias from "../../firebase/Materias.js"
import FullTextSearch from "./FullTextSearch"

class FullTextSeachMaterias {
    constructor() {
        this._intializeData()
    }

    _intializeData() {
        Materias.getMateriasList().then(value => {
            this.searcher = new FullTextSearch(value)            
        })
    }

    /**
     * 
     * @param {String} nombreMateria busca el string nombreMateria dentro de todas las materias en la base de datos
     * @returns {Array} arreglo con las materias disponibles en la forma {id: "id_materia", data:"nombre_materia"} 
     */
    queryData(nombreMateria) {
        return this.searcher.queryData(nombreMateria)
    }
    
}

export default FullTextSeachMaterias
