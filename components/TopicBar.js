import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons'
import { getTopicById } from '../services/topicService'
import { useHistory } from 'react-router'
import { useMediaQuery } from 'react-responsive'
import SortBy from './SortBy'
import "./TopicBar.css"



const TopicBar = ({ setAddingPro, setAddingCon, setTopic, user, active, setActive, idSet }) => {

    const [sortBy, setSortBy] = useState("top")
    const history = useHistory()

    const bigScreen = useMediaQuery({ minWidth: 800 })

    const toggleType = () => {
        if (active === "pros") setActive("cons")
        if (active === "cons") setActive("pros")
    }

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

    if (bigScreen) return (
        <div className="container-topicbar">
            <button className="button-primary" onClick={() => setAdding("pro")}> Add pro argument </button>
            <div className="container-part-topic">
                <SortBy sortClick={sortClick} sortBy={sortBy} />
            </div>
            <button className="button-primary" onClick={() => setAdding("con")}> Add con argument </button>
        </div>
    )
    else return (
        <div className="container-topicbar" style={{ flexDirection: "column" }}>

            <div className="container-part" style={{ width: "100%", marginRight: "0px", marginBottom: "10px", display: "flex", justifyContent: "space-between" }}>

                {active === "pros" && <button className="button-primary button-submit-topic" onClick={() => setAdding("pro")}> Add pro</button>}
                {active === "cons" && <button className="button-primary button-submit-topic" onClick={() => setAdding("con")}> Add con </button>}

            </div>
            <div className="container-part" style={{ width: "100%", marginRight: "0px", display: "flex", justifyContent: "space-between" }}>

                <button className="button-primary button-settings-switch" onClick={toggleType}>
                    {active === "pros" ? "Pros" : "Cons"}
                    <FontAwesomeIcon icon={faExchangeAlt} size="2x" />
                </button>
                <SortBy sortClick={sortClick} sortBy={sortBy} />
            </div>
        </div>
    )
}

export default TopicBar