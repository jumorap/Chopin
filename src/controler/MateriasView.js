class MateriasView{
    constructor(){
        this.mapMaterias = new Map()
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
