//esta no la he provado att Jahel

class Profesores{
    static _DBdisplayCollection = db.collection("MATERIAS_DISPLAY")
    /**
     * Crea El documento profesor en la coleccion profesores
     * @param  {String} nombre Nombre de el profesor que se va a crear
     */
    static CreateProfesor = (nombre)=>{
        Profesores._DBdisplayCollection.add({
            nombre: nombre
        }).then(function(err){
            console.log("Profesor agregado exitosamente")
        }).catch(function(err){
            console.log("Error with CreateProfesor")
        })
    }
}