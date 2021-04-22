import db from "./firebaseConfig"

class Materias{
    constructor(id_materia, Nombre){
        this.id_materia = id_materia

    }

     /**
     * Crea la materia en la coleccion Materias_Search
     * @param  {String} id_materia id de la materia que se va a crear
     * @param  {String} nombre nombre de la materia que se va a crear    
     */
    #createMateriaSearch(id_materia){

    }
    
    /**
     * Crea la materia en la coleccion Materias_Display y retorna el ID de esta
     * @param  {String} nombre Nombre de la materia que se va a crear
     * @return {String}      id de la materia que se acaba de crear
     */
    #createMateriaDisplay(){
        
    }
    
    /**
     * Crea una materia nueva en la base de datos a partir del nombre de esta 
     * @param  {String} nombre nombre de la materia a añadir    
     */
    static CreateMateria(nombre){
        //creamos una materia en display 
        id_materia = this.#createMateriaDisplay(nombre)
        //creamos materia en search con ese mismo id
        this.#createMateriaSearch(id_materia)        
    }
}
