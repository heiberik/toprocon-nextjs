import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { useMediaQuery } from 'react-responsive'
import "./Resources.css"

const Resources = ({ topic }) => {

    const [show, setShow] = useState(false)
    const bigScreen = useMediaQuery({ minWidth: 800 })

    
    if (!show) return (
        <div onClick={() => setShow(true)} style={{display: "flex", alignItems: "center"}}> 
        <FontAwesomeIcon
            icon={faInfoCircle}
            size="2x"
            color="white"
            style={{marginLeft: bigScreen ? "" : "0px", marginTop: bigScreen ? "" : "10px"}}
            className="resources-button" />
            </div>
    )
    else return (
        <div onClick={() => setShow(false)} style={{display: "flex", alignItems: "center"}}>

            <FontAwesomeIcon 
                icon={faInfoCircle}
                size="2x"
                color="white"
                style={{marginLeft: bigScreen ? "" : "0px", marginTop: bigScreen ? "" : "10px"}}
                className="resources-button" />

            <div className="container-resources" >
                {topic.resources.map(resource => {
                    return <a href={resource} key={resource} target="_blank" rel="noreferrer"> {resource} </a>
                })}
            </div>
        </div >
    )
}

export default Resources