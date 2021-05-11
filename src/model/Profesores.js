//esta no la he provado att Jahel

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
        return (await this._DBprofesoresSeach.get()).data().PROFESORES_LIST                                
    }

    /**
    * Create the "profesor" in the Data base
    * @param  {String} nombre name of the "Profesor" to be created
    */
   static CreateProfesor = (nombre)=>{
       this._DBprofesoresDisplay.add({
           nombre: nombre
       }).then((doc)=>{
           __createProfesorList()
       })
   }  


       /**
     * Creates the "Materia" in the collection "UNIVERSIDAD_NACIONAL" in the doc "MATERIAS" in the parameter "MATERIAS_LIST", for fast searching purpuses    
     * @param  {String} id_materia id of the "materia" to be created
     * @param  {String} nombre "nombre" of the "materia" to be created
     */    
    static _createMateriaList(id_materia, nombre){                                            
        this._DBmateriasSeach.update({
            [`MATERIAS_LIST.${id_materia}`]:nombre,            
        })        
        .then(
            console.log(`materia created correctly at materias search`)
        )
        .catch(function(err){
            console.log(`error with createMateriaSearch: ${err}`)
        })
    }
}