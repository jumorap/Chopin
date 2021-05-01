import Materias from "../Model/Materias.js"
import FullTextSearch from "./FullTextSearch"

class FullTextSeachMaterias{
    constructor(){
        this._intializeData()    
        
    }

    _intializeData(){              
        Materias.getMateriasList().then(value =>{            
            this.searcher = new FullTextSearch(value)
        })
    }

    queryData(query){        
        return this.searcher.queryData(query)
    }
    
}

export default FullTextSeachMaterias
