import { db, firebaseAppAuth, storage } from "./firebaseSelf/firebaseConfig";
import firebase from "firebase/app";

class Archivos {
  static _storageRef = storage.ref().child("/UNIVERSIDAD_NACIONAL");
  static _DBmateriasDisplay = db
    .collection("UNIVERSIDAD_NACIONAL")
    .doc("MATERIAS")
    .collection("DISPLAY");

  /**
   * Crea el archivo en la subColeccion Archivos de cada materia añadiendo los datos que se requieren para su filtrado\n
   * @param  {String} id_materia ID de la materia a la cual pertenece el archivo
   * @param  {String} descripcion Descripcion del archivo subido
   * @param  {String} profesor Nombre del profesor que dicto la materia
   * @param  {String} semestre semestre en el que se vio la materia
   * @param  {String} id_usuario ID del usuario que suibio el documeno
   * @param  {String} categorias categorias del documento
   */
  static async crearArchivos(
    id_materia,
    descripcion,
    profesor,
    semestre,
    id_usuario,
    categorias,
    file
  ) {
    //add arvhico to Archivos collections
    const docRef = await this._DBmateriasDisplay
      .doc(id_materia)
      .collection("TRABAJOS")
      .add({
        descripcion: descripcion,
        profesor: profesor,
        semestre: semestre,
        categorias: categorias,
        id_usuario: id_usuario,
      });

    const url = await Archivos._uploadFile(id_materia, docRef.id, file);

    console.log(url);

    //update filters
    Archivos._updateMateriasTrabajos(
      id_materia,
      docRef.id,
      profesor,
      categorias,
      semestre,
      descripcion,
      url
    );

    //update filters
    Archivos._updateMateriasFiltro(
      id_materia,
      docRef.id,
      "profesores",
      profesor
    );
    Archivos._updateMateriasFiltro(
      id_materia,
      docRef.id,
      "semestres",
      semestre
    );
    Archivos._updateMateriasFiltro(id_materia, docRef.id, "tipos", categorias);

    return {
      id_materia: id_materia,
      id_archivo: docRef.id,
      profesor: profesor,
      semestre: semestre,
      tipo: categorias,
      comentarios: descripcion,
      url: url,
      usuario: id_usuario,
    };
  }

  /**
   * Sube el archivo a la base de datos en el storage con el ID que se creo en el firestore
   * @param  {String} id_materia ID de la materia a la cual pertenece el archivo
   * @param  {String} id_archivo ID unico del archivo que se va a subir, debe coincidir con el que se encuentra en la db
   * @param  {File} file Archivo que se va a subir
   */
  static async _uploadFile(id_materia, id_archivo, file) {
    const fileRef = this._storageRef.child(
      `/Materias/${id_materia}/${id_archivo}`
    );

    let snpaShot = await fileRef.put(file);
    let url = snpaShot.ref.getDownloadURL();

    return url;
  }

  /**
   * Sube el archivo a el map trabajos de la coleccion materias display
   * @param  {String} id_materia ID de la materia a la cual pertenece el archivo
   * @param  {String} id_archivo ID del archivo que se acaba de subir
   * @param  {map} valores mapa con los valores que se desea conservar del archivo para ser mostrados
   */
  static _updateMateriasTrabajos(
    id_materia,
    id_archivo,
    nombreProfesor,
    tipoDocumento,
    semestre,
    comentarios,
    url
  ) {
    var user = firebaseAppAuth.currentUser;

    if (user != null) {
      this._DBmateriasDisplay
        .doc(id_materia)
        .update({
          [`trabajos.${id_archivo}`]: {
            profesor: nombreProfesor,
            tipo: tipoDocumento,
            semestre: semestre,
            comentarios: comentarios,
            ID_archivo: id_archivo,
            usuario: firebaseAppAuth.currentUser.uid,
            url: url,
          },
        })
        .then(() => {
          console.log("Documento actualizado con exito");
        })
        .catch((err) => {
          console.log(`error en la actualizacion de archivo ${err}`);
        });
    }
  }

  /**
   * crea un registro en la materia con id_materia, con el parametro (profesor, semestre, categoria)
   * @param  {String} id_materia ID de la materia a la cual pertenece el archivo
   * @param  {String} id_archivo ID del archivo que se acaba de subir
   * @param  {String} nombreFiltro nombre de la categoria del filtro que se le va a añadir el registro ("profesores, categorias, semestre")
   * @param  {String} valorFiltro filtro que se le va a añadir ej ("NombreProfesor(Korgi), Semestre(2021-1), Categoria(parcial 1)"
   */
  static _updateMateriasFiltro(
    id_materia,
    id_archivo,
    nombreFiltro,
    valorFiltro
  ) {
    this._DBmateriasDisplay
      .doc(id_materia)
      .update({
        [`${nombreFiltro}.${valorFiltro}.${id_archivo}`]: 1,
      })
      .then(() => {
        console.log("Documento profesor actualizado con exito");
      })
      .catch(() => {
        console.log(`Error actualizando el documento en ${nombreFiltro}`);
      });
  }

  /**
   * Elimina el archivo de todas la colecciones de la base de datos
   * @param {*} id_materia
   * @param {*} id_archivo
   * @param {*} profesor nombre del profesor que aparece en el archivo
   * @param {*} semestre semestre que aparece en el archivo
   * @param {*} categorias categoria que aparece en el archivo (ej parcial 1, parcial 2, etc)
   */
  static deleteArchivos(
    id_materia,
    id_archivo,
    profesor,
    semestre,
    categorias
  ) {
    //delete record from materia filter
    Archivos._deleteMateriasTrabajos(id_materia, id_archivo);

    //delete record from filters
    Archivos._deleteMateriasFiltro(
      id_materia,
      id_archivo,
      "profesores",
      profesor
    );
    Archivos._deleteMateriasFiltro(
      id_materia,
      id_archivo,
      "semestres",
      semestre
    );
    Archivos._deleteMateriasFiltro(id_materia, id_archivo, "tipos", categorias);

    //delete file from storage
    Archivos._deleteFile(id_materia, id_archivo);
  }

  /**
   * Elimina el archivo de el FireStorage
   * @param {Str} id_materia
   * @param {Str} id_archivo
   */
  static _deleteFile(id_materia, id_archivo) {
    const fileRef = this._storageRef.child(
      `/Materias/${id_materia}/${id_archivo}`
    );
    fileRef
      .delete()
      .then(() => {
        console.log("File eliminado correctamente del storage");
      })
      .catch(() => {
        console.log("Error al eliminar el file del storage");
      });
  }

  /**
   * elimina el registro en la materia con id_materia, con el parametro (profesor, semestre, categoria)
   * @param  {String} id_materia ID de la materia a la cual pertenece el archivo
   * @param  {String} id_archivo ID del archivo que se acaba de subir
   * @param  {String} nombreFiltro nombre de la categoria del filtro que se le va a añadir el registro ("profesores, categorias, semestre")
   * @param  {String} valorFiltro filtro que se le va a añadir ej ("NombreProfesor(Korgi), Semestre(2021-1), Categoria(parcial 1)"
   */
  static _deleteMateriasFiltro(
    id_materia,
    id_archivo,
    nombreFiltro,
    valorFiltro
  ) {
    this._DBmateriasDisplay
      .doc(id_materia)
      .update({
        [`${nombreFiltro}.${valorFiltro}.${id_archivo}`]:
          firebase.firestore.FieldValue.delete(),
      })
      .then(() => {
        console.log("Filtor eliminado con exito");
      })
      .catch(() => {
        console.log(`Error actualizando el documento en ${nombreFiltro}`);
      });
  }

  /**
   * Elimina el archivo del objeto materias
   * @param {str} id_materia
   * @param {str} id_archivo
   */
  static _deleteMateriasTrabajos(id_materia, id_archivo) {
    this._DBmateriasDisplay
      .doc(id_materia)
      .update({
        [`trabajos.${id_archivo}`]: firebase.firestore.FieldValue.delete(),
      })
      .then(() => {
        console.log("archivo de materias borrado satisfactoriamente");
      })
      .catch(() => {
        console.log("no se pudo borrar el archivo");
      });
  }
}

export default Archivos;
