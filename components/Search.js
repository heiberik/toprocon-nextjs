import React, { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import styles from "../styles/Search.module.css"

const Search = ({ submitHandler, inputChangeHandler, searchText, clickHandler }) => {

    const [active, setActive] = useState(false)

    const formRef = useRef()


    const toggleExpand = ( ) => {

        setActive(a => !a)

        if (clickHandler) clickHandler(!active)

        if (!active) {
            formRef.current.style.width = "100%"
            formRef.current.style.maxWidth = "600px"
            formRef.current.childNodes[0].style.paddingLeft = "20px"
            formRef.current.childNodes[0].placeholder = "Search for a topic"
        }
        else {
            formRef.current.style.width = "0px";
            formRef.current.style.maxWidth = "0px"
            formRef.current.childNodes[0].placeholder = ""
            formRef.current.childNodes[0].blur()
        }
    }

    return (

        <div className={styles["search-form-container"]} >
            
            <button
                aria-label="Search"
                className={active ? "button-primary" + " " + styles["button-search-open"] : "button-primary" + " " +styles["button-search"]}
                onClick={toggleExpand} >
                

                {!active && <FontAwesomeIcon icon={faSearch} size="2x" />}
                {active && <FontAwesomeIcon icon={faTimes} size="2x" />}

            </button>

            <form onSubmit={submitHandler} ref={formRef} className={styles["form-search"]}>
                <input value={searchText} id="input-search" autoComplete="off" data-lpignore="true" onChange={inputChangeHandler} placeholder="Search for a topic..." className={styles["input-search"]} />
                <button type="submit" className={styles["submit-search"]}> Search </button>
            </form>
        </div>

    )


}

export default Search