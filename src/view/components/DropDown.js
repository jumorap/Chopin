import React, { useState } from "react";
import "../css/dropDown.css"
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';


function DropDown({ title, items = [], muliSelect: multiSelect = false}) {
    const [open, setOpen] = useState(false)
    const [selection, setSelection] = useState([])
    const toggle = () => setOpen(!open)

    function handleOnClick(item) {
        if (!selection.some(current => current.id === item.id)) {
            if (!multiSelect) {
                setSelection([item])
            } else if (multiSelect) {
                setSelection([...selection, item])
            }
        } else {
            let selectionAfterRemoval = selection
            selectionAfterRemoval = selectionAfterRemoval.filter(
                current => current.id !== item.id
            )
            setSelection([...selectionAfterRemoval])
        }
    }

    function isItemInSelection(item) {
        return !!selection.find(current => current.id === item.id);
    }

    function optionsSelected(properties, item) {
        return (
            <button className={properties} onClick={() => handleOnClick(item)}>
                <span>{item.value}</span>
            </button>
        )
    }

    return (
        <div className="dd-wrapper">
            <div
                tabIndex={0}
                className="dd-header"
                onKeyPress={() => toggle(!open)}
                onClick={() => toggle(!open)}
            >
                <center>
                    {open
                        ? <span> <FaChevronDown className={"chevron"}/> </span>
                        : <span> <FaChevronRight className={"chevron"}/> </span>
                    }
                    {title}
                </center>

            </div>

            {open && (
                <p className={"no-click"}>
                    {items.map(item => (
                        <span>
                            {!isItemInSelection(item)
                                ? optionsSelected("hover-options options", item)
                                : optionsSelected("options selected", item)
                            }
                        </span>
                    ))}
                </p>
            )}

        </div>
    )
}

export default DropDown
