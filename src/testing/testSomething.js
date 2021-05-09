import FullTextSearch from "../controler/FullTextSearch";
import Materias from "../model/Materias"
//use the testSomething function for testing new functionalities.


export function testCreateMateria(){
    Materias.CreateMateria("Materia de prueba")
}

export function testReadMaterias(){
    Materias.getMateriasList().then((value)=>{console.log(value)})
}


export function testFullText() {
    console.log("Inicio")
    //Materias.CreateMateria("Ingesoft")
    //Archivos.crearArchivo("yW6HoVSQUox9hCXQU9wV","archivo de prueba de subida","Jahel Santiago","2022-2","anoasndiasdas","Parcial II")
    //console.log(Materias.getMateriasList(""))
    let data = new Map()
    data.set("laisjbdsd33", "ingenieria de software 1")
    data.set("ljkasbd9223", "ingenieria de software 2")
    data.set("oiyoin123bo", "arquitectua de software")
    data.set("sadkjasbd22", "arquitectura de computadores")
    data.set("dadkjebd22", "arquitectura de computadores internos")
    data.set("noasidbasd2", "introduccion a la teoria de la computacion")


    let materiasSearch = new FullTextSearch(data)
    console.log(materiasSearch.queryData("Pepita"))
}
