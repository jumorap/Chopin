import {db, storage} from "./firebaseConfig"

class Archivos{
    static _DBdisplayCollection = db.collection("MATERIAS_DISPLAY")
    static _storageRef = storage.ref()
    
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
        })
    }

    /**
     * Crea el archivo en la subColeccion Archivos de cada materia añadiendo los datos que se requieren para su filtrado
     * @param  {String} id_materia ID de la materia a la cual pertenece el archivo
     * @param  {String} descripcion Descripcion del archivo subido
     * @param  {String} profesor Nombre del profesor que dicto la materia
     * @param  {String} semestre semestre en el que se vio la materia
     * @param  {String} id_usuario ID del usuario que suibio el documeno
     * @param  {String} categorias categorias del documento
     */
    static crearArchivo(id_materia, descripcion, profesor, semestre, id_usuario, categorias, file){
        this._DBdisplayCollection.doc(id_materia).collection("ARCHIVOS").add({
            descripcion:descripcion,
            profesor:profesor,
            semestre:semestre,
            categorias:categorias,
            id_usuario:id_usuario
        }).then(( docRef)=>{
            Archivos._uploadFile(id_materia, docRef.id, file)
        }).catch((err)=>{
            console.log(`error in crear archivo: ${err}`)
        })



    }
}

export default Archivos


