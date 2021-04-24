import React, {Component} from 'react';
import storage from "../model/firebaseConfig";
import Archivos from "../model/Archivos";

class UploadFileView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nombreMateria: "",
            descripcion: "",
            nombreProfesor: "",
            semestre: "",
            tipo: "",
            attachment: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
    }

    //handle input value's form
    handleChange({target}) {
        this.setState({
            [target.name]: target.value
        });
    }

    //handle file obtained in the form
    handleFileChange = (e) => {
        let file = e.target.files[0];
        this.setState({
            [e.target.name]: file
        })
    }

    render() {

        const onFileChange = (e) => {
            const file = e.target.files[0];
            const storageRef = storage.ref();
            const fileRef = storageRef.child(file.name);
            fileRef.put(file).then(() => {
                    console.log("File uploaded");
                }
            ).catch(() => {
                console.log("Error uploading file");
            })
        }

        const onSubmit = (e) => {
            e.preventDefault()
            Archivos.crearArchivo(this.state.nombreMateria,
                this.state.descripcion,
                this.state.descripcion,
                this.state.semestre,
                this.state.attachment
            );
        }

        return (
            <div>
                <form onSubmit={onSubmit}>
                    <input tpye={'text'} onChange={this.handleChange} value={this.state.nombreMateria}
                           name={"nombreMateria"} placeholder={"Nombre de Materia"}/>
                    <input tpye={'text'} onChange={this.handleChange} value={this.state.nombreProfesor}
                           name="nombreProfesor" placeholder={"Nombre del profesor"}/>
                    <input tpye={'text'} onChange={this.handleChange} value={this.state.descripcion}
                           name={"descripcion"} placeholder={"Descripción del archivo"}/>
                    <input tpye={'text'} onChange={this.handleChange} value={this.state.semestre} name={"semestre"}
                           placeholder={"Semestre"}/>
                    <input type={'file'} onChange={this.handleFileChange} name={"attachment"}/>
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}

export default UploadFileView;
