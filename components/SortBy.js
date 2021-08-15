import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import styles from "../styles/SortBy.module.css"

const SortBy = ({ sortClick, sortBy, leaderboard }) => {

    const [showDropdown, setShowDropdown] = useState(false)

    const toggleDropdown = () => {
        setShowDropdown(s => !s)
    }

    if (leaderboard) return (
        <div className={styles["container-sortby"]}>
            <button className={styles["sortby-button"] + " " +  "button-primary"} onClick={toggleDropdown}> Sort by </button>
            <FontAwesomeIcon icon={faCaretDown} size="2x" />
            {showDropdown && <div className={styles["sortby-dropdown"]}>
                <button onClick={() => { toggleDropdown(); sortClick("total") }} className={sortBy === "total" ? styles["sortby-active"] + " " + styles["sortby"] : styles["sortby"]}>
                    Total points
                </button>
                <button onClick={() => { toggleDropdown(); sortClick("topic") }} className={sortBy === "topic" ? styles["sortby-active"] + " " + styles["sortby"] : styles["sortby"]}>
                    Topic points
                </button>
                <button onClick={() => { toggleDropdown(); sortClick("argument") }} className={sortBy === "argument" ? styles["sortby-active"] + " " + styles["sortby"] : styles["sortby"]}>
                    Argument points
                </button>
                <button onClick={() => { toggleDropdown(); sortClick("mod") }} className={sortBy === "mod" ? styles["sortby-active"] + " " + styles["sortby"] : styles["sortby"]}>
                    Mod points
                </button>
            </div>}
        </div>
    )
    else return (
        <div className={styles["container-sortby"]}>
            <button className={styles["sortby-button"] + " " + "button-primary"} onClick={toggleDropdown}> Sort by </button>
            <FontAwesomeIcon icon={faCaretDown} size="2x" />
            {showDropdown && <div className={styles["sortby-dropdown"]}>
                <button onClick={() => { toggleDropdown(); sortClick("top") }} className={sortBy === "top" ? styles["sortby-active"] + " " + styles["sortby"] : styles["sortby"]}>
                    Top
                </button>
                <button onClick={() => { toggleDropdown(); sortClick("new") }} className={sortBy === "new" ? styles["sortby-active"] + " " + styles["sortby"] : styles["sortby"]}>
                    Newest
                </button>
                <button onClick={() => { toggleDropdown(); sortClick("controversial") }} className={sortBy === "controversial" ? styles["sortby-active"] + " " + styles["sortby"] : styles["sortby"]}>
                    Controversial
                </button>
            </div>}

        </div>
    )
}

export default SortBy