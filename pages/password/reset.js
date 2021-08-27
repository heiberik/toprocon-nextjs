import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import Input from '../../components/Input';
import validator from "email-validator"
import { resetPassword } from '../../services/userService'
import styles from "../../styles/Login.module.css"
import PuffLoader from "react-spinners/PuffLoader";

const EmailPage = () => {

    const [email, setEmail] = useState("")
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)
    const [loading, setLoading] = useState(false)
    

    const onSubmitHandler = (e) => {
        e.preventDefault()

        if (!validator.validate(email)) {
            setError("Invalid email")
        }
        else {
            if (loading) return
            setLoading(true)
            resetPassword(email)
                .then(res => {
                    setLoading(false)
                    setEmail("")
                    setMessage(res.data)
                })
                .catch(error => {
                    setLoading(false)
                    setEmail("")
                    setError(error.response.data)
                })
        }
    }

    const emailChangeHandler = (e) => {
        setError(null)
        setMessage(null)
        setEmail(e.target.value)
    }

    return (
        <div className="container-normal">
            <div className={styles["container-auth-card"]}>

                <h1> Reset password </h1>
                <form onSubmit={onSubmitHandler} >
                    <Input
                        name="email"
                        label="Email"
                        handler={emailChangeHandler}
                        value={email}
                        type="email"
                        placeholder="Email"
                        validation={(v) => validator.validate(v)}
                        icon={<FontAwesomeIcon icon={faEnvelope} color="white" />} />

                    <p className="text-auth"> Open your email to proceed in resetting your password.</p>

                    <div>
                        <button 
                            type="submit" 
                            className="button-secondary button-full-width button-color" style={{ marginBottom: "0px", marginTop: "0px" }}> 
                             
                            {!loading && "Submit"}
                            {loading && <p style={{ visibility: "hidden" }}> submitting </p>}
                            {loading && <div className={styles["container-spinner"]}> 
                                <PuffLoader color={"white"} size={18} />
                            </div>}
                        </button>
                        
                        {message && <p className="text-success"> {message} </p>}
                        {error && <p className="text-error"> {error} </p>}
                    </div>

                </form>
            </div>
        </div>
    )
}

export default EmailPage



