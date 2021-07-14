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
            <button className={styles["sortby-button"] + " " +  "button-primary"} onClick={toggleDropdown}> Sort by</button>
            <FontAwesomeIcon icon={faCaretDown} size="2x" />
            {showDropdown && <div className={styles["sortby-dropdown"]}>
                <button onClick={() => { toggleDropdown(); sortClick("total") }} className={sortBy === "total" ? "sortby-active sortby" : "sortby"}>
                    Total points
                </button>
                <button onClick={() => { toggleDropdown(); sortClick("topic") }} className={sortBy === "topic" ? "sortby-active sortby" : "sortby"}>
                    Topic points
                </button>
                <button onClick={() => { toggleDropdown(); sortClick("argument") }} className={sortBy === "argument" ? "sortby-active sortby" : "sortby"}>
                    Argument points
                </button>
                <button onClick={() => { toggleDropdown(); sortClick("mod") }} className={sortBy === "mod" ? "sortby-active sortby" : "sortby"}>
                    Mod points
                </button>
            </div>}
        </div>
    )
    else return (
        <div className={styles["container-sortby"]}>
            <button className={styles["sortby-button"] + " " + "button-primary"} onClick={toggleDropdown}> Sort by</button>
            <FontAwesomeIcon icon={faCaretDown} size="2x" />
            {showDropdown && <div className={styles["sortby-dropdown"]}>
                <button onClick={() => { toggleDropdown(); sortClick("top") }} className={sortBy === "top" ? "sortby-active sortby" : "sortby"}>
                    Top
                </button>
                <button onClick={() => { toggleDropdown(); sortClick("new") }} className={sortBy === "new" ? "sortby-active sortby" : "sortby"}>
                    Newest
                </button>
                <button onClick={() => { toggleDropdown(); sortClick("controversial") }} className={sortBy === "controversial" ? "sortby-active sortby" : "sortby"}>
                    Controversial
                </button>
            </div>}

        </div>
    )
}

export default SortBy