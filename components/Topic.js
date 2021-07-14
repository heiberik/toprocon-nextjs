import React from 'react'
import ReportButton from './ReportButton'
import Link from "next/link"
import styles from "../styles/Topic.module.css"

const Topic = ({ topic }) => {


    return (
        <Link href={`/topics/${topic._id}`}>
            <div className={styles["container-card-topic"]}>
                <ReportButton
                    type="topic"
                    reportedId={topic._id}
                />

                <p className={styles["topic-card-name"]}> {topic.name} </p>
                <p className={styles["topic-card-username"]}> Topic created by {topic.username}</p>

                <div>
                    <p className={styles["topic-card-info"]}> {topic.prosLength}</p>
                    <p className={styles["topic-card-info"]}> {topic.consLength}</p>
                </div>
            </div>
        </Link>
    )
}

export default Topic