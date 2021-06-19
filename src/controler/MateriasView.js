class MateriasView {
    constructor() {
      this.mapMaterias = new Map();
    }
    /**
     * Validates existence, creates/uses and adds file id as value on a specific key of materiaContext.
     * @param {Map} map1 - materiaContext's Map.
     * @param {String} map2 - file's key.
     * @param {String} id - file's id.
     */
    validate_attribute(map1, map2, id) {
        if (!(map2 in map1)) {
        map1[map2] = new Map([[id, 1]]);
        } else {
        let ma = map1[map2];
        ma.set(id, 1);
        }
    }

    /**
     * Adds new file to materiaContext.
     * @param {Map} materiaMap - materiaContext object in which file is added.
     * @param {Map} archivoMap - file object that is going to be added.
     */
    add_archivo_context(materiaMap, archivoMap) {
        materiaMap.trabajos.push(archivoMap);
        let id = archivoMap.id_archivo;
        this.validate_attribute(materiaMap.profesores, archivoMap.profesores, id);
        this.validate_attribute(materiaMap.semestres, archivoMap.semestres, id);
        this.validate_attribute(materiaMap.tipos, archivoMap.tipo, id);
    }


    /** Adds file to context
     * @param {Obj} archivo  archivo to add to the context
     */
    add_archivo(archivo) {
        //check if the materia exists
        if (!this.mapMaterias.has(archivo.id_materia)) {
          console.log("la materia no se encuentra en el map");
          return;
        }
        // get the materia to be modifed
        const materia_context = this.mapMaterias.get(archivo.id_materia);
        /*console.log(archivo);
        console.log(materia_context);*/
    
        // modifie the materia
        this.add_archivo_context(materia_context, archivo);
      }

    /** Delete desired archive from context
     *
     * @param {Obj} trabajoToDelete  gets the desired trabajo (archive in context- for ex: Parcial 3 ) to delete
     * @param {Obj} currentMateria  gets the current materia of the context
     */
     delete_archivo(trabajoToDelete, currentMateria) {
      /* get desired materia obj*/
  
      console.log("INPUT -----");
      let materia = this.mapMaterias.get(currentMateria);
      console.log("ANTES  ", materia);
      /* removes specific trabajo from materia.trabajos */
      materia.trabajos = materia.trabajos.filter(
        (trabajo) => trabajo.ID_archivo !== trabajoToDelete.ID_archivo
      );
  
      /* Removes trabajo from materia.profesores */
      let profesores = materia.profesores;
      this.delete_types(trabajoToDelete, profesores);
  
      /* Removes trabajo from materia.semestres */
      let semestres = materia.semestres;
      this.delete_types(trabajoToDelete, semestres);
  
      /* Removes trabajo from materia.tipos */
      let tipos = materia.tipos;
      this.delete_types(trabajoToDelete, tipos);
  
      console.log("DESPUES  ", materia.profesores["Profesor Pato"]);
    }
  
    /** This one executes inside delete_archivo(); - deletes the materia's info which is
     * pointed inside an specific materia type
     *
     *
     * @param {Obj} trabajoToDelete  gets the desired trabajo (archive in context- for ex: Parcial 3 ) to delete
     * @param {Map} materiaType gets the specific materia type to delete
     * (this ones goes from the variable "materia" created inside 'delete_archivo' function)
     */
    delete_types(trabajoToDelete, materiaType) {
      Object.keys(materiaType).forEach((type) => {
        let filesType = materiaType[type];
        delete filesType[trabajoToDelete.ID_archivo];
      });
    
    }
  
      
    update(trabajoToDelete, currentMateria) {
      this.delete(trabajoToDelete, currentMateria);
      /* Call Add function  */
    }
  }
  
  export default MateriasView;