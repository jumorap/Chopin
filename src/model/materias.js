import {db} from "./firebaseConfig"

class Materias {
    static _DBdisplayCollection = db.collection("MATERIAS_DISPLAY")
<<<<<<< HEAD
    static _DBsearchCollection = db.collection("MATERIAS_SEARCH")

    /**
      * Crea la materia en la coleccion Materias_Search
      * @param  {String} id_materia id de la materia que se va a crear
      * @param  {String} nombre nombre de la materia que se va a crear
      */
    static _createMateriaSearch(id_materia, nombre) {
        this._DBsearchCollection.add({
            id_materia: id_materia,
            nombre: nombre
        }).catch(function (err) {
=======
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
>>>>>>> 266f1979261168bc53673613420175b51efec9cb
            console.log(`error with createMateriaSearch: ${err}`)
        })
    }

<<<<<<< HEAD
    /**
      * Crea la materia en la coleccion Materias_Display y ry en la coleccion Materias_Search
      * @param  {String} nombre Nombre de la materia que se va a crear
      */
    static CreateMateria = (nombre) => {
=======

    
     /**
     * Crea la materia en la coleccion Materias_Display y ry en la coleccion Materias_Search
     * @param  {String} nombre Nombre de la materia que se va a crear    
     */
    static CreateMateria = (nombre)=>{        
>>>>>>> 266f1979261168bc53673613420175b51efec9cb
        this._DBdisplayCollection.add({
            nombre: nombre,
            categorias: {},
            profesores: {},
            semestres: {}
        }).then(function (docRef) {
            Materias._createMateriaSearch(docRef.id, nombre)
        }).catch(function (err) {
            console.log(`error with createMateriaDisplay: ${err}`)
        })
    }
<<<<<<< HEAD
=======
    
    
    /**
     * Retorna todas las materias disponibles
     * @return {Promise(Obj)}   promesa con un map con todas las materias dispoibles en forma id:materia
     */
    static async getMateriasList(){        
        return (await this._DBsearchMateriasCallection.get()).data().Materias                        
    }
>>>>>>> 266f1979261168bc53673613420175b51efec9cb

    static getIdMateria = (nombre) => {
        const materiaDoc = this._DBdisplayCollection.doc(nombre).id;
        console.log(materiaDoc)
    }


}

export default Materias
