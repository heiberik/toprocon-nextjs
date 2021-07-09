import React, { useState } from 'react'
import { addArgument } from '../services/argumentService.js'
import "./AddArgument.css"

const AddArgument = ({ topic, type, setTopic, user, setAdding }) => {

    const [argument, setArgument] = useState("")
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
        <div className="argument">
            <div style={{ width: "85%" }}>
                <form onSubmit={onSubmitHandler}>
                    <p className="argument-username"> {user?.username || "Anonymous"} </p>
                    <div className="argument-input-wrapper">
                        <textarea 
                            autoFocus 
                            maxLength="250"
                            className="argument-input" 
                            value={argument} 
                            onChange={inputChangeHandler} />
                    </div>
                    <p className="argument-length-counter"> {argument.length} / 250 </p>
                    {error && <p className="text-error" style={{marginBottom: "20px"}}> {error} </p>}
                    <div>
                        <button type="submit" className="button-add-argument"> {type === "cons" ? "Add con" : "Add pro"} </button>
                        <button onClick={() => {setArgument(""); setAdding(false)}} className="button-delete-argument"> Delete </button>
                    </div>
                </form>
            </div>
            <div>

            </div>
        </div>
    )

}

export default AddArgument