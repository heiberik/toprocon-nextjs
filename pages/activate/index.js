import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import Input from '../../components/Input';
import { resendVerificationToken } from '../../services/userService'
import styles from "../../styles/Login.module.css"
import PuffLoader from "react-spinners/PuffLoader";
import { useRouter } from 'next/router';

const ActivatePage = () => {

    const [email, setEmail] = useState("")
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    useEffect(() => {

        if (router.query.message) {
            setError(router.query.message.replaceAll("%20", " "))
        };
    }, [router])

    const onSubmitHandler = (e) => {

        e.preventDefault()
        if (loading) return
        setLoading(true)
        resendVerificationToken(email)
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

    const emailChangeHandler = (e) => {
        setError(null)
        setMessage(null)
        setEmail(e.target.value)
    }

    return (
        <div className="container-normal">
            <div className={styles["container-auth-card"]}>

                <h1> Resend verification </h1>
                <form onSubmit={onSubmitHandler} >
                    <Input
                        name="email"
                        label="Email"
                        handler={emailChangeHandler}
                        value={email}
                        type="email"
                        placeholder="Email"
                        validation={() => false}
                        icon={<FontAwesomeIcon icon={faEnvelope} color="white" />} />

                    <p className="text-auth"> Enter your email to resend a verification email.</p>

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

export default ActivatePage



