import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import styles from "../styles/SortBy.module.css"

const SortBy = ({ sortClick, sortBy, alternatives }) => {

    const [showDropdown, setShowDropdown] = useState(false)

    const toggleDropdown = () => {
        setShowDropdown(s => !s)
    }

    return (
        <div
            className={styles["container-sortby"]}
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)} >

            <button
                className={styles["sortby-button"] + " " + "button-secondary"}
                onClick={toggleDropdown}> Sort by
            </button>
            <FontAwesomeIcon icon={faCaretDown} size="2x" />

            {showDropdown && <div className={styles["dummy-path"]}> </div>}
            {showDropdown && <div className={styles["sortby-dropdown"]}>
                {alternatives.map(alt =>
                    <button
                        key={alt}
                        onClick={() => { sortClick(alt) }}
                        className={sortBy === alt ? styles["sortby-active"] + " " + styles["sortby"] : styles["sortby"]}>
                        {alt}
                    </button>
                )}
            </div>}
        </div>
    )
}

export default SortBy