import elasticlunr from "elasticlunr"

class FullTextSearch{
    /**
     * Crea un objeto para realizar la busqueda de texto en este
     * @param  {Map} Map mapa que contiene los datos en la forma ID:data    
     */
    constructor(map){
        this.data = map
        this.index = elasticlunr();
        this._createReverseIndex(this.data)  
        elasticlunr.clearStopWords();      
    }

    /**
     * Crea los indices para la busqueda de texto completa con la libreria elasticlunr
     * @param  {Map} map objeto que contiene los datos en la forma ID:data    
     */
    _createReverseIndex(map){        
        this.index.addField("data")
        this.index.setRef("id")
        for(let [key, value] of map){
            this.index.addDoc({id:key, data: value})
        }                
    }

    
    /**
     * Crea los indices para la busqueda de texto completa con la libreria elasticlunr
     * @param  {String} search texto que desea buscar
     * @return {Array}      arreglo que contiene los resultados de la busqueda en la fomra {id, data}
     */
    queryData(search){
        let serch_results = this.index.search(search,{
            expand: true
        })
        let results = []
        serch_results.forEach((obj)=>{
            results.push({id: obj.ref, data: this.data.get(obj.ref)})
        })
        return results
    }
    
}

export default FullTextSearch