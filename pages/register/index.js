import React, { useState } from 'react';
import Link from 'next/link';
import Input from '../../components/Input';
import { checkIfUsernameTaken, registerUser } from "../../services/userService"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import validator from "email-validator"
import styles from "../../styles/Register.module.css"
import styles2 from "../../styles/Login.module.css"


const RegisterPage = () => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")

    const [message, setMessage] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)


    const onSubmitHandler = (e) => {

        e.preventDefault()
        setError(null)
        setMessage(null)

        if (username.length < 5) {
            setError("Username must be at least 5 characters")
        }
        else if (!validator.validate(email)) {
            setError("Email is not valid")
        }
        else if (password1.length < 6) {
            setError("Password must be at least 6 characters")
        }
        else if (password1 !== password2) {
            setError("Passwords do not match")
        }
        else {
            if (loading) return
            setLoading(true)
            registerUser(username, email, password1)
                .then(res => {
                    setLoading(false)
                    setUsername("")
                    setEmail("")
                    setPassword1("")
                    setPassword2("")
                    setMessage(res.data)
                })
                .catch(error => {
                    setLoading(false)
                    setMessage(null)
                    setError(error.response.data)
                })
        }
    }

    const inputChangeHandler = (e) => {
        setError(null)
        setMessage(null)
        switch (e.target.name) {
            case "username": setUsername(e.target.value); break;
            case "email": setEmail(e.target.value); break;
            case "password1": setPassword1(e.target.value); break;
            case "password2": setPassword2(e.target.value); break;
            default: break;
        }
    }

    const checkIfUsernameIsTaken = async (username) => {

        if (username.length < 5) return false

        const isUsernameTaken = await checkIfUsernameTaken(username);

        if (isUsernameTaken.data) return false
        else return true
    }


    return (
        <div className="container-normal">

            <div className={styles2["container-auth-card"]}>

                <h1> Register </h1>
                <form onSubmit={onSubmitHandler}>
                    <Input
                        name="username"
                        label="Username"
                        handler={inputChangeHandler}
                        value={username}
                        type="text"
                        placeholder="Username"
                        validation={checkIfUsernameIsTaken}
                        icon={<FontAwesomeIcon icon={faUser} color="white" />} />
                    <Input
                        name="email"
                        label="Email"
                        handler={inputChangeHandler}
                        value={email}
                        type="email"
                        placeholder="Email"
                        validation={(v) => validator.validate(v)}
                        icon={<FontAwesomeIcon icon={faEnvelope} color="white" />} />
                    <Input
                        name="password1"
                        label="Password"
                        handler={inputChangeHandler}
                        value={password1}
                        type="password"
                        placeholder="Password"
                        validation={(v) => v.length >= 6}
                        icon={<FontAwesomeIcon icon={faLock} color="white" />} />
                    <Input
                        name="password2"
                        label="Confirm password"
                        handler={inputChangeHandler}
                        value={password2}
                        type="password"
                        placeholder="Confirm password"
                        validation={(v) => v === password1 && v.length >= 6}
                        icon={<FontAwesomeIcon icon={faLock} color="white" />} />


                    <p className="text-auth"> Already have an account? <Link href="/login">Login</Link> here.</p>


                    <div>
                        <button type="submit" className="button-primary button-full-width  button-color"> Register </button>
                        {message && <p className="text-message" style={{ color: "white" }}> {message} </p>}
                        {error && <p className="text-error"> {error} </p>}
                    </div>

                </form>
            </div>
        </div>
    )
}

export default RegisterPage



