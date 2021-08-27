import { db } from "./firebaseSelf/firebaseConfig";
import firebase from "firebase/app";


// Clean an array of strings 1 by 1, removing accents/diacritics
export function cleanAccents(textToClean) {
    return (textToClean.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
}

// Order by attribute 'materia' the array with objects introduced
function orderByMateria(arrayWithMaterias) {
    let materiasInOrder = []
    let fullMateriasResult = {}

    // First order 'materias' in the array {materiasInOrder}
    arrayWithMaterias.forEach(element => materiasInOrder.push(element.materia.toUpperCase()))
    materiasInOrder = materiasInOrder.sort()

    // Is generated a dictionary with the name of 'materia' and variable i
    for (var i = 0; i < materiasInOrder.length; i++) {
        fullMateriasResult[materiasInOrder[i]] = i
    }

    // Is returned the array sorted by 'materia'
    return arrayWithMaterias.sort((
        (a, b) => fullMateriasResult[a.materia.toUpperCase()] - fullMateriasResult[b.materia.toUpperCase()])
    )
}


class Materias {
  /**
   * Used to create new "Materias" in the collection display as well as a retrive it, here it is the priamary location of the "materias"
   * @type {firestore.CollectionReference}
   */
  static _DBmateriasDisplay = db
    .collection("UNIVERSIDAD_NACIONAL")
    .doc("MATERIAS")
    .collection("DISPLAY");

  /**
   * used to create new "Materias" in the document Search, which is used to get all the "materias" in one DB call
   * @type {firestore.DocumentReference}
   */
  static _DBmateriasSeach = db
    .collection("UNIVERSIDAD_NACIONAL")
    .doc("MATERIAS");

  /**
   * Bring all the Subjects in the entire university
   * @async
   * @return {Promise(Obj)}   Object with all the subjects in the university with shape: {id:materia}
   */
  static async getMateriasList() {
      const fullMateriasList = (await this._DBmateriasSeach.get()).data().MATERIAS_LIST

      // Call the function cleanAccents to remove accents/diacritics
      for (var i = 0; i < fullMateriasList.length; i++) {
          fullMateriasList[i].materia  = cleanAccents(fullMateriasList[i].materia)
      }
      return orderByMateria(fullMateriasList)
  }

  /**
   *
   * @param {String} id_materia id of the subject which will bring the information
   */
  constructor(id_materia) {
    this._intilializeValues(id_materia);
  }

  /**
   *
   * @param {String} id_materia ID of the "Materia" which is retrived to intialize the class with the "Profesores", "Semestre", "tipos"
   */
  _intilializeValues(id_materia) {
    this.id_materia = id_materia;
    Materias._DBmateriasDisplay
      .doc(id_materia)
      .get()
      .then((value) => {
        const atributosMateria = value.data();
        this.nombre = atributosMateria.nombre;
        this.profesores = atributosMateria.profesores;
        this.semestres = atributosMateria.semestres;
        this.tipos = atributosMateria.tipos;
        this.trabajos = this._getArrayFromObject(atributosMateria.trabajos);
      })
      .catch((e) => `error leyendo la materia: ${e}`);
  }

  /**
   * 
   * @param {String} id ID of the materia to get the data
   * @returns promise with the materia 
   */
  static async _getFilesList(id) {
    console.log("Se a realizado una lectura de una Materia en la DB");
    return Materias._DBmateriasDisplay.doc(id).get();
  }

  /**
   * Create the "materia" in the Data base
   * @param  {String} nombre name of the "Materia" to be created
   */
  static CreateMaterias = (nombre) => {
    this._DBmateriasDisplay
      .add({
        nombre: nombre,
        tipos: {},
        profesores: {},
        semestres: {},
        trabajos: {},
      })
      .then(function (docRef) {
        console.log(`correctly created ${docRef.id} in Db Dysplay`);
        Materias._createMateriaList(docRef.id, nombre);
      })
      .catch(function (err) {
        console.log(`error with CreateMateria: ${err}`);
      });
  };

  /**
   * Creates the "Materia" in the collection "UNIVERSIDAD_NACIONAL" in the doc "MATERIAS" in the parameter "MATERIAS_LIST", for fast searching purpuses
   * @param  {String} id_materia id of the "materia" to be created
   * @param  {String} nombre "nombre" of the "materia" to be created
   */
  static _createMateriaList(id_materia, nombre) {
    this._DBmateriasSeach
      .update({
        MATERIAS_LIST: firebase.firestore.FieldValue.arrayUnion({
          id: id_materia,
          materia: nombre,
        }),
      })
      .then(() => console.log(`materia created correctly at materias search`))
      .catch(function (err) {
        console.log(`error with createMateriaSearch: ${err}`);
      });
  }


  

  _getArrayFromObject(object) {
    const objectArray = [];
    Object.keys(object).forEach((key) => {
      objectArray.push(object[key]);
    });
    return objectArray;
  }
}

export default Materias;
