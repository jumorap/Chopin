import { db, storage } from "./firebaseSelf/firebaseConfig"


class Archivos {
    static _storageRef = storage.ref().child("/UNIVERSIDAD_NACIONAL")
    static _DBmateriasDisplay = db.collection("UNIVERSIDAD_NACIONAL").doc("MATERIAS").collection("DISPLAY")
    

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
            Archivos._updateMateriasTrabajos(id_materia, docRef.id, profesor, categorias, semestre, descripcion)            
            Archivos._updateMateriasFiltro(id_materia,docRef.id,"profesores",profesor)
            Archivos._updateMateriasFiltro(id_materia,docRef.id,"semestres",semestre)
            Archivos._updateMateriasFiltro(id_materia,docRef.id,"tipos",categorias)
        }).catch((err)=>{
            console.log(`error in crear archivo: ${err}`)
        })
    }
    
    
    /**
     * Sube el archivo a la base de datos en el storage con el ID que se creo en el firestore
     * @param  {String} id_materia ID de la materia a la cual pertenece el archivo
     * @param  {String} id_archivo ID unico del archivo que se va a subir, debe coincidir con el que se encuentra en la db            
     * @param  {File} file Archivo que se va a subir
     */
    static _uploadFile(id_materia, id_archivo, file) {
        const fileRef = this._storageRef.child(`/Materias/${id_materia}/${id_archivo}`);
        fileRef.put(file)
        .then((snpaShot)=> {
            console.log("file added succesfully")
        })
        .catch(err=> "error ading the file " + err)
    }

    
     /**
     * Sube el archivo a el map trabajos de la coleccion materias display
     * @param  {String} id_materia ID de la materia a la cual pertenece el archivo
     * @param  {String} id_archivo ID del archivo que se acaba de subir
     * @param  {map} valores mapa con los valores que se desea conservar del archivo para ser mostrados
     */
    static _updateMateriasTrabajos(id_materia, id_archivo, nombreProfesor, tipoDocumento, semestre, comentarios) {
        this._DBmateriasDisplay.doc(id_materia).update({
            [`trabajos.${id_archivo}`]:{
                profesor: nombreProfesor,
                tipo: tipoDocumento,
                semestre:semestre, 
                comentarios:comentarios,
                ID_archivo: id_archivo
            }            
        })
        .then(()=> {console.log("Documento actualizado con exito")})
        .catch((err)=> {console.log(`error en la actualizacion de archivo ${err}`)})
    }

    
         /**
     * crea un registro en la materia con id_materia, con el parametro (profesor, semestre, categoria) 
     * @param  {String} id_materia ID de la materia a la cual pertenece el archivo
     * @param  {String} id_archivo ID del archivo que se acaba de subir
     * @param  {String} nombreFiltro nombre de la categoria del filtro que se le va a añadir el registro ("profesores, categorias, semestre")
     * @param  {String} valorFiltro filtro que se le va a añadir ej ("NombreProfesor(Korgi), Semestre(2021-1), Categoria(parcial 1)"
     */
    static _updateMateriasFiltro(id_materia, id_archivo, nombreFiltro, valorFiltro) {
        this._DBmateriasDisplay.doc(id_materia).update({
            [`${nombreFiltro}.${valorFiltro}.${id_archivo}`]:1
        })
        .then(() => {console.log("Documento profesor actualizado con exito")})
        .catch((err) => {console.log(`Error actualizando el documento en ${nombreFiltro}`)})
    }

}

export default Archivos


