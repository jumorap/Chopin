import {db} from "./firebaseSelf/firebaseConfig"
import firebase from "firebase/app"

class Materias{    
    
    /**
     * Used to create new "Materias" in the collection display as well as a retrive it, here it is the priamary location of the "materias"
     * @type {firestore.CollectionReference}
     */
    static _DBmateriasDisplay = db.collection("UNIVERSIDAD_NACIONAL").doc("MATERIAS").collection("DISPLAY")
    
    /**
     * used to create new "Materias" in the document Search, which is used to get all the "materias" in one DB call
     * @type {firestore.DocumentReference}
     */
    static _DBmateriasSeach = db.collection("UNIVERSIDAD_NACIONAL").doc("MATERIAS")    
    
    /**
     * Bring all the Subjects in the entire university
     * @async 
     * @return {Promise(Obj)}   Object with all the subjects in the university with shape: {id:materia}
     */
    static  async getMateriasList(){        
        console.log("materia render")
        return (await this._DBmateriasSeach.get()).data().MATERIAS_LIST                                
    }
    
    
    /**
     * 
     * @param {String} id_materia id of the subject which will bring the information
     */
    constructor(id_materia){
        this._intilializeValues(id_materia)        
    }
        
    
    /**
     * 
     * @param {String} id_materia ID of the "Materia" which is retrived to intialize the class with the "Profesores", "Semestre", "tipos"
     */
    _intilializeValues(id_materia){        
        this.id_materia = id_materia        
        Materias._DBmateriasDisplay.doc(id_materia).get()
        .then((value)=>{
            const atributosMateria = value.data()
            this.nombre = atributosMateria.nombre
            this.profesores = atributosMateria.profesores
            this.semestres = atributosMateria.semestres
            this.tipos = atributosMateria.tipos
            this.trabajos = this._getArrayFromObject(atributosMateria.trabajos)                        
        })
        .catch(e=>`error leyendo la materia: ${e}`)
    }
    
    /**
    * Create the "materia" in the Data base
    * @param  {String} nombre name of the "Materia" to be created
    */
   static CreateMaterias = (nombre)=>{         
       this._DBmateriasDisplay.add({
           nombre: nombre,
           tipos: {},
           profesores: {},
           semestres: {},
           trabajos:{}
       }).then(function (docRef) {                    
           console.log(`correctly created ${docRef.id} in Db Dysplay`)    
           Materias._createMateriaList(docRef.id, nombre)            
       }).catch(function (err) {
           console.log(`error with CreateMateria: ${err}`)
       })        
   }


   
    /**
     * Creates the "Materia" in the collection "UNIVERSIDAD_NACIONAL" in the doc "MATERIAS" in the parameter "MATERIAS_LIST", for fast searching purpuses    
     * @param  {String} id_materia id of the "materia" to be created
     * @param  {String} nombre "nombre" of the "materia" to be created
     */    
    static _createMateriaList(id_materia, nombre){                                            
        this._DBmateriasSeach.update({
            MATERIAS_LIST: firebase.firestore.FieldValue.arrayUnion({id: id_materia, materia:nombre})
        })        
        .then(
            console.log(`materia created correctly at materias search`)
        )
        .catch(function(err){
            console.log(`error with createMateriaSearch: ${err}`)
        })
    }

    _getArrayFromObject(object){
        const objectArray = []
        Object.keys(object).map((key)=>{
            objectArray.push(object[key])
        })
        console.log(objectArray)
        return objectArray
    }

    
    


}

export default Materias


