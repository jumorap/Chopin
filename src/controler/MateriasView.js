class MateriasView {
  constructor() {
    this.mapMaterias = new Map();
  }

  delete(trabajoToDelete, currentMateria) {
    let materia = this.mapMaterias.get(currentMateria);
    materia.trabajos = materia.trabajos.filter(
      (trabajo) => trabajo.ID_archivo !== trabajoToDelete.ID_archivo
    ); //elimina trabajo dentro de materia
    let profesores = materia.profesores;
    Object.keys(profesores).forEach((prof) => {
      let filesProfe = profesores[prof];
      delete filesProfe[trabajoToDelete.ID_archivo];
    });
    let semestres = materia.semestres;
    Object.keys(semestres).forEach((sem) => {
      let filesSem = semestres[sem];
      delete filesSem[trabajoToDelete.ID_archivo];
    });
    let tipos = materia.tipos;
    Object.keys(tipos).forEach((type) => {
      let filesType = tipos[type];
      delete filesType[trabajoToDelete.ID_archivo];
    });
  }

  update(trabajoToDelete, currentMateria) {
    // FALTA LLAMAR FUNC ADD 

    this.delete(trabajoToDelete, currentMateria);
  }
}

export default MateriasView;
