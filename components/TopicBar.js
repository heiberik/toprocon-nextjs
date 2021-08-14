import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons'
import { getTopicById } from '../services/topicService'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import UserContext from '../context/user'
import SortBy from './SortBy'
import styles from "../styles/TopicBar.module.css"



const TopicBar = ({ setAdding, setTopic, active, setActive, topicSet }) => {

    const [sortBy, setSortBy] = useState("top")
    const [user, setUser] = useContext(UserContext);
    const router = useRouter()

    const sortClick = (sortBy) => {
        setSortBy(sortBy)
        const id = window.location.pathname.split("/").pop()
        getTopicById(topicSet ? topicSet._id : id, sortBy)
            .then(res => {
                setTopic(res.data)
            })
            .catch(error => {
                console.log(error);
            })
    }


    const setAdd = () => {
        if (!user) router.push("/login")
        else setAdding(a => !a)
    }

    return (
        <div className={styles["container-topicbar"]}>
            <button className="button-primary" onClick={() => setAdd()}> Add argument </button>
            <div className={styles["container-part-topic"]}>
                <SortBy sortClick={sortClick} sortBy={sortBy} />
            </div>
        </div>
    )
}

export default TopicBar