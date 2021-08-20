import React, { useRef, useState } from 'react'
import { addArgument } from '../services/argumentService.js'
import { useContext } from 'react'
import UserContext from '../context/user'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import styles from "../styles/Argument.module.css"

const AddArgument = ({ topic, setTopic, setAdding }) => {

    const [argument, setArgument] = useState("")
    const [user, setUser] = useContext(UserContext);
    const [selected, setSelected] = useState(false)
    const [error, setError] = useState(null)
    const textField = useRef(null)

    const onSubmitHandler = (e) => {
        e.preventDefault()
        if (argument.trim().length < 10) {
            setError("Argument must be at least 10 characters.")
        }
        else {
            addArgument(argument.replace(/\s+/g, ' ').trim(), topic._id, selected)
                .then(res => {
                    setArgument("");
                    setAdding(false)
                    setTopic(res.data)
                })
                .catch(error => {
                    setError(error.response.data)
                })
        }
    }

    const inputChangeHandler = (e) => {
        e.target.style.height = "";
        e.target.style.height = e.target.scrollHeight + "px";
        setError(null)
        setArgument(e.target.value)
    }

    const deleteClick = () => {
        setArgument("")
        setSelected(false)
        setAdding(false)
    }

    const select = (type) => {
        setSelected(type)
        setTimeout(() => {
            textField.current.focus()
        }, 0)
    }


    if (!selected) {
        return (
            <>
                <div className={styles["argument"]} >



                    <div className={styles["container-voting"]} style={{filter: "blur(2px)"}}>
                        <div className={styles["overlay"]}></div>
                        <div className={styles["wrapper-upvote"]}>
                            <FontAwesomeIcon icon={faCaretUp} size="1x" color="white" />
                            <p className={styles["upvote"]}> 0 </p>
                        </div>
                        <div className={styles["wrapper-downvote"]}>
                            <p className={styles["downvote"]}> 0 </p>
                            <FontAwesomeIcon icon={faCaretDown} size="1x" color="white" />
                        </div>

                    </div>


                    <div className={styles["container-text"] + " " + styles["full-width"]}>
                        <div>
                            <button className={styles["button-choose"]} onClick={() => select("pro")}> Pro </button>
                            <button className={styles["button-choose"]} onClick={() => select("con")}> Con </button>
                        </div>
                        <div className={styles["argument-input-wrapper"]} style={{filter: "blur(2px)"}}>
                            <textarea
                                maxLength="250"
                                className={styles["argument-input"]}
                                value="Your new and well thought out argument."
                                onChange={inputChangeHandler} />
                        </div>
                        <p className={styles["argument-username"]} style={{filter: "blur(2px)"}}>  {user.username} </p>
                    </div>
                </div>
                {error && <p className="text-error" style={{ margin: "10px 0px" }}> {error} </p>}

            </>
        )
    }
    else return (
        <>
            <div className={styles["argument"]} >

                <div className={styles["container-voting"]}>
                    <div className={styles["wrapper-upvote"]}>
                        <FontAwesomeIcon icon={faCaretUp} size="1x" color="white" />
                        <p className={styles["upvote"]}> 0 </p>
                    </div>
                    <div className={styles["wrapper-downvote"]}>
                        <p className={styles["downvote"]}> 0 </p>
                        <FontAwesomeIcon icon={faCaretDown} size="1x" color="white" />
                    </div>
                </div>

                <div className={styles["container-text"] + " " + styles["full-width"]}>
                    <p className={styles["argument-type-pro"]}> {selected} </p>
                    <div className={styles["argument-input-wrapper"]}>
                        <textarea
                            autoFocus
                            ref={textField}
                            maxLength="250"
                            className={styles["argument-input"]}
                            value={argument}
                            onChange={inputChangeHandler} />
                    </div>
                    <p className={styles["argument-username"]}>  {user.username} </p>
                </div>
            </div>
            {error && <p className="text-error" style={{ margin: "10px 0px" }}> {error} </p>}
            <div className={styles["container-buttons"]}>
                <button className={styles["button-add"]} onClick={onSubmitHandler}> Add </button>
                <button className={styles["button-delete"]} onClick={deleteClick}> Delete </button>
            </div>

        </>

    )

}

export default AddArgument