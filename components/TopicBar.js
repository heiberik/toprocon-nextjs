import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons'
import { getTopicById } from '../services/topicService'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import UserContext from '../context/user'
import SortBy from './SortBy'
import styles from "../styles/TopicBar.module.css"



const TopicBar = ({ setAddingPro, setAddingCon, setTopic, active, setActive, idSet }) => {

    const [sortBy, setSortBy] = useState("top")
    const [user, setUser] = useContext(UserContext);
    const router = useRouter()

    const sortClick = (sortBy) => {
        setSortBy(sortBy)
    }

    useEffect(() => {

        const id = window.location.pathname.split("/").pop()
        getTopicById(idSet ? idSet : id, sortBy)
            .then(res => {
                setTopic(res.data)
            })
            .catch(error => {
                console.log(error);
            })

    }, [sortBy, setTopic, idSet])

    const setAdding = (type) => {
        if (!user) history.push("/login")
        else {
            if (type === "pro") {
                setAddingPro(p => !p)
                setAddingCon(false)
            }
            if (type === "con") {
                setAddingCon(c => !c)
                setAddingPro(false)
            }
        }
    }

    return (
        <div className={styles["container-topicbar"]}>
            <button className="button-primary" onClick={() => setAdding("pro")}> Add pro argument </button>
            <div className={styles["container-part-topic"]}>
                <SortBy sortClick={sortClick} sortBy={sortBy} />
            </div>
            <button className="button-primary" onClick={() => setAdding("con")}> Add con argument </button>
        </div>
    )
}

export default TopicBar