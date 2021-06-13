class MateriasView {
  constructor() {
    this.mapMaterias = new Map();
  }

<<<<<<< HEAD
  /** Delete desired archive from context 
   * 
   * @param {Obj} trabajoToDelete  gets the desired trabajo (archive in context- for ex: Parcial 3 ) to delete
   * @param {Map} currentMateria  gets the current materia of the context 
   */
   delete_archivo(trabajoToDelete, currentMateria) {
=======
     
  /** */
  delete(trabajoToDelete, currentMateria) {
>>>>>>> 1aba9d035e2d93607eb7b4d7600c07421664de26
    /* get desired materia obj*/
    let materia = this.mapMaterias.get(currentMateria);
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




//   delete(trabajoToDelete, currentMateria) {
//     /* get desired materia obj*/
//     let materia = this.mapMaterias.get(currentMateria);
//     /* removes specific trabajo from materia.trabajos */
//     materia.trabajos = materia.trabajos.filter(
//       (trabajo) => trabajo.ID_archivo !== trabajoToDelete.ID_archivo
//     );
//     /* Removes trabajo from materia.profesores */
//     let profesores = materia.profesores;
//     Object.keys(profesores).forEach((prof) => {
//       let filesProfe = profesores[prof];
//       delete filesProfe[trabajoToDelete.ID_archivo];
//     });
//     /* Removes trabajo from materia.semestres */
//     let semestres = materia.semestres;
//     Object.keys(semestres).forEach((sem) => {
//       let filesSem = semestres[sem];
//       delete filesSem[trabajoToDelete.ID_archivo];
//     });
//     /* Removes trabajo from materia.tipos */
//     let tipos = materia.tipos;
//     Object.keys(tipos).forEach((type) => {
//       let filesType = tipos[type];
//       delete filesType[trabajoToDelete.ID_archivo];
//     });
//   }
    
  update(trabajoToDelete, currentMateria) {
    this.delete(trabajoToDelete, currentMateria);
    /* Call Add function  */
  }
}

export default MateriasView;
