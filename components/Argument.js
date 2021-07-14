import React, { useState } from 'react'
import { addVote } from '../services/argumentService.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import ReportButton from './ReportButton.js'
import styles from "../styles/Argument.module.css"


const Argument = ({ argument, type, setTopic, user }) => {

    const router = useRouter()

    const addVoteClick = (e, voteType) => {

        e.stopPropagation();

        if (!user) return;

        addVote(argument._id, voteType)
            .then(res => {
                setTopic(topic => {
                    let topicCopy = { ...topic }
                    if (type === "con") topicCopy.cons = topicCopy.cons.map(arg => arg._id === res.data._id ? res.data : arg)
                    if (type === "pro") topicCopy.pros = topicCopy.pros.map(arg => arg._id === res.data._id ? res.data : arg)
                    return topicCopy
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    const usernameClicked = () => {
        router.push("/profile/" + argument.user.username)
    }

    return (
        <div className={styles["argument"]} >

            <div style={{ maxWidth: "85%" }}>
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <ReportButton
                        type="argument"
                        reportedId={argument._id}
                    />
                    <p className={styles["argument-username"]} onClick={usernameClicked}> {argument.user.username} </p>

                </div>
                <p className={styles["argument-text"]}> {argument.message} </p>
            </div>
            <div>
                <div className={styles["wrapper-upvote"]} onClick={(e) => addVoteClick(e, "upvote")}>
                    <FontAwesomeIcon icon={faCaretUp} size="1x" color="white" />
                    <p className={styles["upvote"]}> {argument.upvotes} </p>
                </div>
                <div className={styles["wrapper-downvote"]} onClick={(e) => addVoteClick(e, "downvote")}>
                    <p className={styles["downvote"]}> {argument.downvotes} </p>
                    <FontAwesomeIcon icon={faCaretDown} size="1x" color="white" />
                </div>
            </div>
        </div>
    )
}

export default Argument