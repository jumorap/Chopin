import elasticlunr from "elasticlunr"

class FullTextSearch{
    /**
     * Crea un objeto para realizar la busqueda de texto en este
     * @param  {Obj} data Objeto que contiene los datos en la forma ID:data    
     */
    constructor(data) {
        this.data = data
        this.index = elasticlunr();
        this.idMateriaMap = new Map()
        this._createReverseIndex(this.data)  
        elasticlunr.clearStopWords();      
    }

    /**
     * Crea los indices para la busqueda de texto completa con la libreria elasticlunr
     * @param  {Obj} data objeto que contiene los datos en la forma ID:data    
     */
    _createReverseIndex(data) {
        this.index.addField("materia")
        this.index.setRef("id")        
        data.map(materia=>{
            this.index.addDoc(materia)            
            this.idMateriaMap.set(materia.id, materia.materia)            
        })        
    }

    
    /**
     * Busca dentro de los datos disponibles la string search y retorna un arreglo con los resultados dado un String "search" que se va a buscar
     * @param  {String} search texto que desea buscar
     * @return {Array}      arreglo que contiene los resultados de la busqueda en la fomra {id, data}
     */
    queryData(search) {
        let serch_results = this.index.search(search, {
            expand: true
        })
        let results = []        
        serch_results.forEach((obj) => {
            results.push({id: obj.ref, data: this.idMateriaMap.get(obj.ref)})
        })
        return results
    }
    
}

export default FullTextSearch