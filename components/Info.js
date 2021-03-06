import React from 'react'
import styles from "../styles/Info.module.css"

const Info = ({ showInfo, setShowInfo}) => {


    if (showInfo) return (
        <div className={styles["container-info"]} >

            <h1 className={styles["header-new-topic"]}> Creating a new topic </h1>

            <div className={styles["info-text"]}>
                <p>Thank you for considering adding a new topic!</p>
                <p style={{ marginLeft: "30px" }}> <strong className={styles["info-rule"]}> 1: </strong>
                    Check if a similar topic exists already.
                    </p>
                <p style={{ marginLeft: "30px" }}> <strong className={styles["info-rule"]}> 2: </strong>
                    Make sure the topic name and description is objective and unbiased.
                    </p>
                <p style={{ marginLeft: "30px" }}> <strong className={styles["info-rule"]}> 3: </strong>
                    Only one topic per day can be created by a user. So make sure to read through your text a second time before adding the topic.
                </p>
                <p style={{ marginLeft: "30px" }}> <strong className={styles["info-rule"]}> 4: </strong>
                    Topics can not be changed by anyone else than administrators. So make sure to read through your text a second time before adding the topic.
                </p>
            </div>

            <button style={{minWidth: "100%", borderRadius: "10px"}} className="button-primary" onClick={() => setShowInfo(false)}> I understand! </button>
        </div>
    )
    else return (
        <button className="button-secondary" style={{width: "100%", borderRadius: "10px", marginTop: "20px"}} onClick={() => setShowInfo(true)}> Read rules </button>
    )
}

export default Info