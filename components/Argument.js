import React, { useState } from 'react'
import { addVote } from '../services/argumentService.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router'


import "./Argument.css"
import ReportButton from './ReportButton.js'

const Argument = ({ argument, type, setTopic, user }) => {

    const [expanded, setExpanded] = useState(false)
    const history = useHistory()

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
        history.push("/profile/" + argument.user.username)
    }

    return (
        <div className="argument" onClick={() => setExpanded(e => !e)} onMouseEnter={() => setExpanded(true)} onMouseLeave={() => setExpanded(false)}>
            
            <div style={{ maxWidth: "85%" }}>
                <div style={{display: "flex", alignItems: "flex-start"}}>
                <ReportButton
                        type="argument"
                        reportedId={argument._id}
                    />
                    <p className="argument-username" onClick={usernameClicked}> {argument.user.username} </p>
                </div>
                <p className={expanded ? "argument-text argument-text-expanded" : "argument-text"}> {argument.message} </p>
            </div>
            <div>
                <div className="wrapper-upvote" onClick={(e) => addVoteClick(e, "upvote")}>
                    <FontAwesomeIcon icon={faCaretUp} size="1x" color="white" />
                    <p className="upvote"> {argument.upvotes} </p>
                </div>
                <div className="wrapper-downvote" onClick={(e) => addVoteClick(e, "downvote")}>
                    <p className="downvote"> {argument.downvotes} </p>
                    <FontAwesomeIcon icon={faCaretDown} size="1x" color="white" />
                </div>
            </div>
        </div>
    )
}

export default Argument