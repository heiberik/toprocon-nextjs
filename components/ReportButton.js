import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { addReport } from '../services/reportService'
import styles from "../styles/ReportButton.module.css"
import { useContext } from 'react'
import UserContext from '../context/user'

const ReportButton = ({ type, reportedId }) => {

    const [active, setActive] = useState(false)
    const [reported, setReported] = useState(false)
    const [error, setError] = useState(null)
    const [user, setUser] = useContext(UserContext);

    const reasons = [
        "Bad language",
        "Inappropriate content",
        "Spam",
        "Other"
    ]

    const handleMouseLeave = (e) => {
        e.stopPropagation()
        setActive(false)
    }

    const handleClick = (e) => {
        e.stopPropagation()
        e.preventDefault()
        setActive(a => !a)
    }

    const handleReport = (e, reason) => {
        e.stopPropagation()
        e.preventDefault()

        if (!user) setError("Login to moderate and earn points.")
        else {
            try {
                addReport(type, reportedId, reason)
                .then(res => {
                    setReported(true)
                })
                .catch(error => {
                    setError(error.response.data)
                })
            }
            catch(e){
                setError("Must be logged in")
            }
        }
    }

    return (
        <div className={styles["container-report"]} onClick={handleClick} onMouseLeave={handleMouseLeave}>
            <FontAwesomeIcon icon={faEllipsisV} size="2x" color="red" />
            {active && <div className={styles["dummy-popup"]}> </div>}
            {active && <div className={styles["container-popup"]} onClick={(e) => e.stopPropagation()}>
                {!reported && !error && <p className={styles["report-header"]}> Report this item for: </p>}
                {!reported && !error && reasons.map(reason => {
                    return <p
                        key={reason}
                        onClick={(e) => handleReport(e, reason)}
                        className={styles["report-alt"]}>
                        {reason} </p>
                })}
                {reported && !error && <p className={styles["thank-you"]}> Thank you for reporting! </p>}
                {error && <p className={styles["thank-you"]}> {error} </p>}

            </div>}
        </div>
    )
}

export default ReportButton