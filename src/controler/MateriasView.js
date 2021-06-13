class MateriasView {
    constructor() {
      this.mapMaterias = new Map();
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