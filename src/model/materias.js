import {db} from "./firebaseConfig"

class Materias {
    static _DBdisplayCollection = db.collection("MATERIAS_DISPLAY")
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
            console.log(`error with createMateriaSearch: ${err}`)
        })
    }

    /**
      * Crea la materia en la coleccion Materias_Display y ry en la coleccion Materias_Search
      * @param  {String} nombre Nombre de la materia que se va a crear
      */
    static CreateMateria = (nombre) => {
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

    static getIdMateria = (nombre) => {
        const materiaDoc = this._DBdisplayCollection.doc(nombre).id;
        console.log(materiaDoc)
    }


}

export default Materias
