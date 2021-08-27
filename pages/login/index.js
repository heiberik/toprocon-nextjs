import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { loginUser } from "../../services/userService"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import Input from '../../components/Input'
import styles from "../../styles/Login.module.css"
import { useRouter } from 'next/router'
import { useContext } from 'react'
import PuffLoader from "react-spinners/PuffLoader"
import UserContext from '../../context/user'

const LoginPage = ({ location }) => {

    const [user, setUser] = useContext(UserContext);
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    useEffect(() => {
        

    }, [])

    const onSubmitHandler = (e) => {
        e.preventDefault()
        if (username.length < 5) {
            setError("Username is too short to be valid")
        }
        else if (password.length < 6) {
            setError("Password is too short to be valid")
        }
        else {
            if (loading) return
            setLoading(true)

            loginUser(username, password)
                .then(res => {

                    setLoading(false)
                    setUser(res.data)
                    router.back()

                })
                .catch(error => {
                    setLoading(false)
                    setPassword("")
                    setError(error.response.data)
                })
        }
    }

    const usernameChangeHandler = (e) => {
        setError(null)
        setUsername(e.target.value)
    }

    const passwordChangeHandler = (e) => {
        setError(null)
        setPassword(e.target.value)
    }

    return (
        <div className="container-normal">

            <div className={styles["container-auth-card"]}>
                <h1> Login </h1>
                <form onSubmit={onSubmitHandler} >
                    <Input
                        label="Username"
                        handler={usernameChangeHandler}
                        value={username}
                        type="text"
                        placeholder="Username"
                        validation={v => false}
                        icon={<FontAwesomeIcon icon={faUser} color="white" />} />
                    <Input
                        label="Password"
                        handler={passwordChangeHandler}
                        value={password}
                        type="password"
                        placeholder="Password"
                        validation={v => false}
                        icon={<FontAwesomeIcon icon={faLock} color="white" />} />

                    <p className="text-auth">Don&apos;t have an account? <Link href="/register">Sign up!</Link></p>
                    
                    <div>
                        <button 
                            type="submit" 
                            className="button-secondary button-full-width button-color"> 
                    
                            {!loading && "Login"}
                            {loading && <p style={{ visibility: "hidden" }}> logging in </p>}
                            {loading && <div className={styles["container-spinner"]}> 
                                <PuffLoader color={"white"} size={18} />
                            </div>}
                        </button>
                       
                       
                        {message && <p className="text-success"> {message} </p>}
                        {error && <p className="text-error"> {error} </p>}
                    </div>

                    <p className="text-auth" style={{marginBottom: "0px"}}> Forgot password? <Link href="/password/reset">Reset password</Link> here.</p>
                </form>
            </div>

        </div>
    )
}

export default LoginPage



