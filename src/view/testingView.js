import React, {Component} from "react";
import Materias from "../model/materias";
import Archivos from "../model/Archivos";
import file from "../assets/files/uml.pdf"
import FullTextSearch from "../Controler/FullTextSearch";


class Testing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            materia: "",
            busqueda: "",
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange({target}) {
        this.setState({
            [target.name]: target.value
        });
    }



    render() {


        const materiaId = (e) => {
            e.preventDefault()
            Materias.getIdMateria(this.state.materia);
        }

        const FileSuccess = (e) => {
            e.preventDefault()
            console.log("Running test uploadFileSuccess")
            Archivos.crearArchivo(
                "Ingesoft",
                "Pepito",
                "Parcial",
                "2020-1",
                "Parcial de prueba",
                file
            );
        }

        const FileFail = (e) => {
            e.preventDefault()
            console.log("Running test uploadFileFile")
            Archivos.crearArchivo(
                "sasasas",
                "Pepito",
                "Parcial",
                "2020-1",
                "Parcial de prueba",
                file
            );
        }

        const completeSearch = (e) => {
            e.preventDefault()
            let data = new Map()
            data.set("laisjbdsd33", "ingenieria de software 1")
            data.set("ljkasbd9223", "ingenieria de software 2")
            data.set("oiyoin123bo", "arquitectua de software")
            data.set("sadkjasbd22", "arquitectura de computadores")
            data.set("dadkjebd22", "arquitectura de computadores internos")
            data.set("noasidbasd2", "introduccion a la teoria de la computacion")
            data.set("asdafkskd", "Ingesoft")

            let materiasSearch = new FullTextSearch(data)
            console.log(materiasSearch.queryData(this.state.busqueda))
        }

        return (
            <div>
                <h2>Welcome to Testing view</h2>
                <br></br>
                <form onSubmit={FileFail}>
                    <button>Test Upload File Fail!</button>
                </form>
                <form onSubmit={FileSuccess}>
                    <button>Test Upload File Success!</button>
                </form>
                <form onSubmit={materiaId}>
                    <input tpye={'text'} onChange={this.handleChange} value={this.state.materia}
                           name={"materia"} placeholder={"Nombre de Materia"}/>
                    <button>Test search materiaId by name</button>
                </form>
                <form onSubmit={completeSearch}>
                    <input tpye={'text'} onChange={this.handleChange} value={this.state.busqueda}
                           name={"busqueda"} placeholder={"Nombre de Materia para bsuqueda completa"}/>
                    <button>Test complete search by name</button>
                </form>
            </div>
        );
    }
}

export default Testing;