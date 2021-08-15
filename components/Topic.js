import React from 'react'
import ReportButton from './ReportButton'
import Link from "next/link"
import styles from "../styles/Topic.module.css"

const Topic = ({ topic }) => {

    return (
        <Link href={`/topics/${topic._id}`}>
            <a>
                <div className={styles["container-card-topic"]}>
                    <ReportButton
                        type="topic"
                        reportedId={topic._id}
                    />
                    
                    <div>
                        <p className={styles["topic-card-info"] + " " + styles["info-pros"]}> {topic.numPros + topic.numCons}</p>
                        {false && <p className={styles["topic-card-info"] + " " + styles["info-cons"]}> {topic.numCons}</p>}
                    </div>
                    <p className={styles["topic-card-name"]}> {topic.name} </p>

                </div>
            </a>
        </Link>
    )
}

export default Topic