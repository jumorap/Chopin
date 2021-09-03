import {db} from "./firebaseConfig"
import firebase from "firebase/app"
import { cleanAccents } from "./Materias";


class Profesores{
    /**
     * Used to create new "Profesores" in the collection display as well as a retrive it, here it is the priamary location of the "materias"
     * @type {firestore.CollectionReference}
     */
    static _DBprofesoresDisplay = db.collection("UNIVERSIDAD_NACIONAL").doc("PROFESORES").collection("DISPLAY")

    /**
     * used to create new "Materias" in the document Search, which is used to get all the "materias" in one DB call
     * @type {firestore.DocumentReference}
     */
     static _DBprofesoresSeach = db.collection("UNIVERSIDAD_NACIONAL").doc("PROFESORES")    
    
    /**
     * Bring all the "Profesores" in the entire university
     * @async 
     * @return {Promise(Obj)}   Object with all the subjects in the university with shape: {id:materia}
     */
    static  async getProfesoresList(){
        var fullProfesoresList = (await this._DBprofesoresSeach.get()).data().PROFESORES_LIST

        // Call the function cleanAccents to remove accents/diacritics
        for (var i = 0; i < fullProfesoresList.length; i++) {
            fullProfesoresList[i] = cleanAccents(fullProfesoresList[i])
        }
        return fullProfesoresList.sort()
    }

    /**
    * Create the "profesor" in the Data base
    * @param  {String} nombre name of the "Profesor" to be created
    */
   static CreateProfesor = (nombre)=>{
        this._DBprofesoresSeach.update({
            PROFESORES_LIST: firebase.firestore.FieldValue.arrayUnion(nombre)        
        })        
        .then(
            console.log(`profesor created correctly at materias search`)
        )
        .catch(function(err){
            console.log(`error with createProfesorSearch: ${err}`)
        })
   }  



}

export default Profesores