import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import styles from "./AddButton.module.css"

const AddButton = ({ clickHandler, text }) => {


    return (

        <button className={"button-primary" + " " + styles["button-component-add"]} onClick={clickHandler}>
            <FontAwesomeIcon icon={faPlus} size="2x" />
            <p> {text} </p>
        </button>
    )

}

export default AddButton