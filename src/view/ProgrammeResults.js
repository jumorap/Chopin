import React, { useState } from "react";
import DropDown from "./components/DropDown";
import "./css/programmeResults.css"
import { FilesByProgramme } from "./components/FilesByProgramme";
import { FaHamburger } from "react-icons/all";
import Slide from 'react-reveal/Slide';
import UploadFile from "./UploadFile/UploadFile";

const items = [
    {
        id: 1,
        value: 'Parcial 1',
    },
    {
        id: 2,
        value: 'Parcial 2',
    },
    {
        id: 3,
        value: 'Parcial 3',
    },
    {
        id: 4,
        value: 'Taller 1',
    }
]

const itemsFiles = [
    {
        url: 'https://firebasestorage.googleapis.com/v0/b/red-board-70d99.appspot.com/o/UNIVERSIDAD_NACIONAL%2FMaterias%2FxmLGdb0H239zeZGezOje%2F0hMDLqhQxOTX3rps8Bnd?alt=media&token=4ce282f3-fa1b-49ae-b5ae-19e23a36789a',
        name: 'Fundamentos de mecánica',
        description: 'El ilustrísimo maestro, doctor san Ovidio, nos compartió esta increíble guía de estudio',
        teacher: 'Ovidio Almanza'
    },
    {
        url: 'https://firebasestorage.googleapis.com/v0/b/red-board-70d99.appspot.com/o/UNIVERSIDAD_NACIONAL%2FMaterias%2FxmLGdb0H239zeZGezOje%2F0hMDLqhQxOTX3rps8Bnd?alt=media&token=4ce282f3-fa1b-49ae-b5ae-19e23a36789a',
        name: 'Fundamentos de mecánica',
        description: 'El ilustrísimo maestro, doctor san Ovidio, nos compartió esta increíble guía de estudio',
        teacher: 'Ovidio Almanza'
    },
    {
        url: 'https://firebasestorage.googleapis.com/v0/b/red-board-70d99.appspot.com/o/UNIVERSIDAD_NACIONAL%2FMaterias%2FxmLGdb0H239zeZGezOje%2F0hMDLqhQxOTX3rps8Bnd?alt=media&token=4ce282f3-fa1b-49ae-b5ae-19e23a36789a',
        name: 'Fundamentos de mecánica',
        description: 'El ilustrísimo maestro, doctor san Ovidio, nos compartió esta increíble guía de estudio',
        teacher: 'Ovidio Almanza'
    },
    {
        url: 'https://firebasestorage.googleapis.com/v0/b/red-board-70d99.appspot.com/o/UNIVERSIDAD_NACIONAL%2FMaterias%2FxmLGdb0H239zeZGezOje%2F0hMDLqhQxOTX3rps8Bnd?alt=media&token=4ce282f3-fa1b-49ae-b5ae-19e23a36789a',
        name: 'Fundamentos de mecánica',
        description: 'El ilustrísimo maestro, doctor san Ovidio, nos compartió esta increíble guía de estudio',
        teacher: 'Ovidio Almanza'
    }
]

const programmeName = "Fundamentos de Electricidad y Magnetísmo"

function ProgrammeResults() {

    const [open, setOpen] = useState(true)

    function programme(properties, propertiesHamburger, redBar) {
        return (
            <div className={`files-section ${properties}`}>
                <div className={`title-programme ${redBar}`}>
                    <FaHamburger
                        className={propertiesHamburger}
                        onClick={() => setOpen(!open)}
                    />
                    {programmeName}
                </div>
                <div className={"for-each-programme"}>
                    <FilesByProgramme items={itemsFiles}/>
                </div>
            </div>
        )
    }

    return (
        <div className={"general"}>
            {open &&
                <Slide left>
                    <div className={"principal-menu-bar"}>
                        <DropDown title="Categoría" items={items} muliSelect/>
                        <DropDown title="Profesor" items={items} muliSelect/>
                        <DropDown title="Semestre" items={items} muliSelect/>
                    </div>
                </Slide>
            }
            {open
                ? programme("files-section-non-clicked", "hamburger-menu hamburger-menu-clicked", "red-bar")
                : programme("files-section-clicked", "hamburger-menu")
            }
            <UploadFile/>
        </div>
    )
}

export default ProgrammeResults

