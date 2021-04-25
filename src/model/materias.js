import {db} from "./firebaseConfig"
import FullTextSearch from "../Controler/FullTextSearch"
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
            id_materia:[`Materias.${nombre}`]
        }).catch(function(err){
            console.log(`error with createMateriaSearch: ${err}`)
        })
    }


    
     /**
     * Crea la materia en la Base de datos colleccion Universidad/Materias/Display
     * @param  {String} nombre Nombre de la materia que se va a crear    
     */
    static CreateMateria = (nombre)=>{            
        this._DBmateriasDisplay.add({
            nombre: nombre,
            tipos: {},
            profesores: {},
            semestres: {}
        }).then(function (docRef) {            
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
        return (await this._DBmateriasSeach.get()).data()                        
    }

        /**
     * Dado un Id, Retorna la materias correspindiete
     * @return {Promise(Obj)}   promesa con un objeto con los datos nombre,tipos, profesores, semestres
     */
    static async getMateriaById(ID_materia){
        return (await this._DBmateriasDisplay.doc(ID_materia).get()).data()
    }
    
    static async initSearcher(){
        this.getMateriasList().then((data)=>{            
            return new FullTextSearch(data)
        })
    }


    //Recibe el nombre exacto de una materia y retorna su id
    // (Solo el primer resultado del querySnapshot).
    static getIdMateria(nombre){
        const docRef = this._DBmateriasDisplay.where("nombre","==",nombre).get()
            .then(querySnapshot =>{
                if(!querySnapshot.empty)console.log(querySnapshot.docs[0].id);
                else throw new Error("warning,not subject found");
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
    }

}

export default Materias
