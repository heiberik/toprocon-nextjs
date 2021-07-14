import React, { useState } from 'react'
import { addArgument } from '../services/argumentService.js'
import { useContext } from 'react'
import UserContext from '../context/user'
import styles from "../styles/AddArgument.module.css"

const AddArgument = ({ topic, type, setTopic, setAdding }) => {

    const [argument, setArgument] = useState("")
    const [user, setUser] = useContext(UserContext);
    const [error, setError] = useState(null)

    const onSubmitHandler = (e) => {
        e.preventDefault()
        if (argument.trim().length < 10) {
            setError("Argument must be at least 10 characters.")
        }
        else {
            addArgument(argument.replace(/\s+/g, ' ').trim(), topic._id, type)
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


    return (
        <div className={styles["argument"]}>
            <div style={{ width: "85%" }}>
                <form onSubmit={onSubmitHandler}>
                    <p className={styles["argument-username"]}> {user?.username || "Anonymous"} </p>
                    <div className={styles["argument-input-wrapper"]}>
                        <textarea 
                            autoFocus 
                            maxLength="250"
                            className={styles["argument-input"]} 
                            value={argument} 
                            onChange={inputChangeHandler} />
                    </div>
                    <p className={styles["argument-length-counter"]}> {argument.length} / 250 </p>
                    {error && <p className={styles["text-error"]} style={{marginBottom: "20px"}}> {error} </p>}
                    <div>
                        <button type="submit" className={styles["button-add-argument"]}> {type === "cons" ? "Add con" : "Add pro"} </button>
                        <button onClick={() => {setArgument(""); setAdding(false)}} className={styles["button-delete-argument"]}> Delete </button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default AddArgument