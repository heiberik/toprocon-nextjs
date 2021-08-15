import React, { useState } from 'react'
import { addVote } from '../services/argumentService.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import ReportButton from './ReportButton.js'
import styles from "../styles/Argument.module.css"
import { useContext } from 'react'
import UserContext from '../context/user'


const Argument = ({ argument, type, setTopic }) => {

    const [user, setUser] = useContext(UserContext);
    const router = useRouter()

    const addVoteClick = (e, voteType) => {

        e.stopPropagation();

        if (!user) router.push("/login")
        else {
            addVote(argument._id, voteType)
            .then(res => {
                setTopic(topic => {
                    let topicCopy = { ...topic }
                    topicCopy.args = topicCopy.args.map(arg => arg._id === res.data._id ? { type , ...res.data} : arg)
                    return topicCopy
                })
            })
            .catch(error => {
                console.log(error);
            })
        }
    }

    const usernameClicked = () => {
        router.push("/profile/" + argument.user.username)
    }

    return (
        <div className={styles["argument"]} >

            <div className={styles["container-voting"]}>
                <div className={styles["wrapper-upvote"]} onClick={(e) => addVoteClick(e, "upvote")}>
                    <FontAwesomeIcon icon={faCaretUp} size="1x" color="white" />
                    <p className={styles["upvote"]}> {argument.upvotes} </p>
                </div>
                <div className={styles["wrapper-downvote"]} onClick={(e) => addVoteClick(e, "downvote")}>
                    <p className={styles["downvote"]}> {argument.downvotes} </p>
                    <FontAwesomeIcon icon={faCaretDown} size="1x" color="white" />
                </div>
            </div>

            <div className={styles["container-text"]}>
                <p className={styles["argument-type"]}> {argument.type && argument.type} </p>
                <p className={styles["argument-text"]}> {argument.message} </p>
                <p className={styles["argument-username"]} onClick={usernameClicked}> {argument.user.username} </p>
            </div>

            <ReportButton
                type="argument"
                reportedId={argument._id}
            />

        </div>
    )
}

export default Argument