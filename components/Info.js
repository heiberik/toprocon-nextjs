import React from 'react'
import styles from "../styles/Info.module.css"

const Info = ({ showInfo, setShowInfo}) => {


    if (showInfo) return (
        <div className={styles["container-info"]} >

            <div className={styles["info-text"]}>
                <p>Thank you for considering adding a new topic!</p>
                <p>
                    Interesting topics. Provocative topics. Niché topics.
                    Every topic is welcomed and a key factor in making this
                    site a place where thoughts can be shared and steadfast
                    opinions perhaps can be loosened.
                </p>
                <p>
                    To strive towards these goals we must all adhere to a
                    few basic rules when making a new topic. Please read them
                    carefully.
                </p>
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

            <button className={styles["info-button"]} onClick={() => setShowInfo(false)}> I understand! </button>
        </div>
    )
    else return (
        <button className={styles["info-button-white"]} onClick={() => setShowInfo(true)} style={{marginTop: "20px"}}> Read rules </button>
    )
}

export default Info