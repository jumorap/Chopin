import {db} from "./firebaseConfig"
class Materias{    
    static _DBmateriasDisplay = db.collection("UNIVERSIDAD_NACIONAL").doc("MATERIAS").collection("DISPLAY")
    static _DBmateriasSeach = db.collection("UNIVERSIDAD_NACIONAL").doc("MATERIAS")
    
    /**
     * Crea la materia en el map materias_list en la colecccion Universidad/Materias
     * @param  {String} id_materia id de la materia que se va a crear
     * @param  {String} nombre nombre de la materia que se va a crear    
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


    
     /**
     * Crea la materia en la Base de datos colleccion Universidad/Materias/Display
     * @param  {String} nombre Nombre de la materia que se va a crear    
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
     * Retorna todas las materias disponibles junto con su ID
     * @return {Promise(Map)}   promesa con un map con todas las materias dispoibles en forma id:materia
     */
    static async getMateriasList(){        
        return (await this._DBmateriasSeach.get()).data().MATERIAS_LIST                        
    }


    /**
     * Retorna todas la materia correspondiente a su ID
     * @return {Promise(Map)}   promesa con un map con todas las materias dispoibles en forma id:materia
     */
    static async getMateria(id_materia){

    }

}

export default Materias
