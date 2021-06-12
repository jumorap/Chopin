class MateriasView {
  constructor() {
    this.mapMaterias = new Map();
  }

     
  /** */
  delete(trabajoToDelete, currentMateria) {
    /* get desired materia obj*/
    let materia = this.mapMaterias.get(currentMateria);
    /* removes specific trabajo from materia.trabajos */
    materia.trabajos = materia.trabajos.filter(
      (trabajo) => trabajo.ID_archivo !== trabajoToDelete.ID_archivo
    );
    /* Removes trabajo from materia.profesores */
    let profesores = materia.profesores;
    Object.keys(profesores).forEach((prof) => {
      let filesProfe = profesores[prof];
      delete filesProfe[trabajoToDelete.ID_archivo];
    });
    /* Removes trabajo from materia.semestres */
    let semestres = materia.semestres;
    Object.keys(semestres).forEach((sem) => {
      let filesSem = semestres[sem];
      delete filesSem[trabajoToDelete.ID_archivo];
    });
    /* Removes trabajo from materia.tipos */
    let tipos = materia.tipos;
    Object.keys(tipos).forEach((type) => {
      let filesType = tipos[type];
      delete filesType[trabajoToDelete.ID_archivo];
    });
  }

  update(trabajoToDelete, currentMateria) {
    this.delete(trabajoToDelete, currentMateria);
    /* Call Add function  */
  }
}

export default MateriasView;
