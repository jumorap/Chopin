import {db, storage} from "./firebaseConfig"
import Materias from "./materias";


class Archivos{
    static _DBdisplayCollection = db.collection("MATERIAS_DISPLAY")
    static _storageRef = storage.ref().child("/UNIVERSIDAD_NACIONAL")
    static _DBmateriasDisplay = db.collection("UNIVERSIDAD_NACIONAL").doc("MATERIAS").collection("DISPLAY")
    /**
     * Sube el archivo a la base de datos en el storage con el ID que se creo en el firestore
     * @param  {String} id_materia ID de la materia a la cual pertenece el archivo
     * @param  {String} id_archivo ID unico del archivo que se va a subir, debe coincidir con el que se encuentra en la db            
     * @param  {File} file Archivo que se va a subir
     */
    static _uploadFile(id_materia, id_archivo, file){
        const fileRef = this._storageRef.child(`/Materias/${id_materia}/${id_archivo}`);
        fileRef.put(file).then((snpaShot)=>{
            console.log("file added succesfully")
        }).catch("Error uploading file")
    }

    /**
     * Crea el archivo en la subColeccion Archivos de cada materia añadiendo los datos que se requieren para su filtrado\n
     * @param  {String} id_materia ID de la materia a la cual pertenece el archivo
     * @param  {String} descripcion Descripcion del archivo subido
     * @param  {String} profesor Nombre del profesor que dicto la materia
     * @param  {String} semestre semestre en el que se vio la materia
     * @param  {String} id_usuario ID del usuario que suibio el documeno
     * @param  {String} categorias categorias del documento
     */
    static crearArchivos(id_materia, descripcion, profesor, semestre, id_usuario, categorias, file){
        this._DBmateriasDisplay.doc(id_materia).collection("TRABAJOS").add({
            descripcion:descripcion,
            profesor:profesor,
            semestre:semestre,
            categorias:categorias,
            id_usuario:id_usuario
        }).then((docRef)=>{
            Archivos._uploadFile(id_materia, docRef.id, file)
        }).catch((err)=>{
            console.log(`error in crear archivo: ${err}`)
        })
    }



    //Función provisional para probar el subir archivo
    static crearArchivo(nombreMateria, nombreProfesor, tipoDocumento, semestre, comentarios, file){
        const idMateria = Materias.getIdMateria(nombreMateria);
        if(!idMateria)return
        this._DBmateriasDisplay.doc(idMateria).collection("ARCHIVOS").add({
            tipo:tipoDocumento,
            profesor:nombreProfesor,
            semestre:semestre,            
            comentarios:comentarios
        }).then(( docRef)=>{
            Archivos._uploadFile(idMateria, docRef.id, file)
        }).catch((err)=>{
            console.log(`error in crear archivo: ${err}`)
        })
    }



}

export default Archivos


