class MateriasView{
    constructor(){
        this.mapMaterias = new Map()
    }

    /**
    * Validates existence, creates/uses and adds file id as value on a specific key of materiaContext.
    * @param {String} plural - materiaContext's key.
    * @param {String} Singular - file's key.
    * @param {Map} materia - materiaContext object.
    * @param {Map} archivo - file object.
    */ 
    validate_attribute(plural, singular, materia, archivo){
        let id = archivo.get('ID_archivo')
        let map1 = materia.get(plural)
        let map2 = archivo.get(singular)
        if (!map1.has(map2)){
          map1.set(map2, new Map([[id,1]]))
        } else{
          map1.get(map2).set(id, 1)
        }
    }
     

    /**
    * Adds new file to materiaContext.
    * @param {Map} materiaMap - materiaContext object in which file is added.
    * @param {Map} archivoMap - file object that is going to be added.
    */ 
    add_archivo_context(materiaMap, archivoMap){
        materiaMap.get('trabajos').push(archivoMap)
        this.validate_attribute('profesores', 'profesor', materiaMap, archivoMap)
        this.validate_attribute('tipos', 'tipo', materiaMap, archivoMap)
        this.validate_attribute('semestres', 'semestre', materiaMap, archivoMap)
    }

    add_archivo (id_materia, archivo){
        //check if the materia exists
        if(!this.mapMaterias.has(id_materia)){
            console.log("la materia no se encuentra en el map")
            return
        }

        this.add_archivo_context(this.mapMaterias.get(id_materia), archivo)
    }

    
    update_archivo(id_materia, id_archivo, profesores, semestres, tipo, comentarios, url = ""){
        //check if the materia exists
        if(!this.mapMateria.has(id_materia)){
            console.log("la materia no se encuentra en el map")
            return
        }



        this.update_filtros()

        //**new file to show in the views */
        const new_file = {
            ID_archivo: id_archivo,
            comentarios: comentarios,
            profesor: profesores,
            semestre: semestres,
            tipo: tipo,
            url: url,
        }

        this.update_file(id_materia, new_file)

    }

    /**
     * 
     * @param {String} id_materia Id of the materia to update
     * @param {String} field object conaining the ID_archivo, comentarios, profesor, semestre, tipo, url
     * @param {String} new_doc new documento to append with the form {id_archivo: 1}
     */
    update_filtros(id_materia, field, new_doc, ){

    }

    
     
    /**
     * 
     * @param {String} id_materia Id of the materia to update
     * @param {Obj} new_file object conaining the ID_archivo, comentarios, profesor, semestre, tipo, url
     */
    update_file(id_materia, new_file){
        this.mapMaterias.get(id_materia).trabajos.push(new_file)
    }
}

export default MateriasView;
