import {db} from "./firebaseConfig"

class Materias{
    static _DBdisplayCollection = db.collection("MATERIAS_DISPLAY")
    static _DBsearchMateriasCallection = db.collection("MATERIAS_SEARCH").doc("UNIVERSIDAD_NACIONAL")    
    
    /**
     * Crea la materia en la coleccion Materias_Search
     * @param  {String} id_materia id de la materia que se va a crear
     * @param  {String} nombre nombre de la materia que se va a crear    
     */    
    static _createMateriaSearch(id_materia, nombre){                        
        this._DBsearchMateriasCallection.update({
            [`Materias.${nombre}`]:id_materia
        }).catch(function(err){
            console.log(`error with createMateriaSearch: ${err}`)
        })
    }


    
     /**
     * Crea la materia en la coleccion Materias_Display y ry en la coleccion Materias_Search
     * @param  {String} nombre Nombre de la materia que se va a crear    
     */
    static CreateMateria = (nombre)=>{        
        this._DBdisplayCollection.add({
            nombre: nombre,
            categorias: {},
            profesores: {},
            semestres:{}
        }).then(function(docRef){            
            Materias._createMateriaSearch(docRef.id, nombre)            
        }).catch(function(err){
            console.log(`error with createMateriaDisplay: ${err}`)
        })        
    }
    
    
    /**
     * Retorna todas las materias disponibles
     * @return {Promise(Obj)}   promesa con un map con todas las materias dispoibles en forma id:materia
     */
    static async getMateriasList(){        
        return (await this._DBsearchMateriasCallection.get()).data().Materias                        
    }

    
}

export default Materias
