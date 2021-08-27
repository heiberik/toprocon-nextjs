import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import Input from '../../components/Input';
import { newPassword } from '../../services/userService';
import UserService from "../../server/modules/user/userService"
import styles from "../../styles/Login.module.css"
import { useRouter } from 'next/router';
import PuffLoader from "react-spinners/PuffLoader";


const PasswordPage = ({ token, idUser }) => {

    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const router = useRouter();

    const onSubmitHandler = (e) => {

        e.preventDefault()
        if (password1.length < 6) {
            setError("Password is too short to be valid")
        }
        else if (password1 !== password2) {
            setError("Passwords do not match")
        }
        else {
            if (loading) return
            setLoading(true)
            newPassword(idUser, password2, token)
                .then(res => {
                    setLoading(false)
                    router.push("/login")
                })
                .catch(error => {
                    setLoading(false)
                    setPassword1("")
                    setPassword2("")
                    setError(error.response.data)
                })
        }
    }

    const password1ChangeHandler = (e) => {
        setError(null)
        setPassword1(e.target.value)
    }

    const password2ChangeHandler = (e) => {
        setError(null)
        setPassword2(e.target.value)
    }

    return (
        <div className="container-normal">
            <div className={styles["container-auth-card"]}>

                <h1> New password </h1>
                <form onSubmit={onSubmitHandler} >
                    <Input
                        name="password1"
                        label="Password"
                        handler={password1ChangeHandler}
                        value={password1}
                        type="password"
                        placeholder="Minimum 6 characters"
                        validation={(v) => v.length >= 6}
                        icon={<FontAwesomeIcon icon={faLock} color="white" />} />
                    <Input
                        name="password2"
                        label="Confirm password"
                        handler={password2ChangeHandler}
                        value={password2}
                        type="password"
                        placeholder="Reenter password"
                        validation={(v) => v === password1 && v.length >= 6}
                        icon={<FontAwesomeIcon icon={faLock} color="white" />} />

                    <div className="container-loader">
                        <button
                            type="submit"
                            className="button-secondary button-full-width button-color"
                            style={{ marginBottom: "20px", marginTop: "15px" }}>

                            {!loading && "Submit"}
                            {loading && <p style={{ visibility: "hidden" }}> submitting </p>}
                            {loading && <div className={styles["container-spinner"]}>
                                <PuffLoader color={"white"} size={18} />
                            </div>}
                        </button>
                        {error && <p className="text-error"> {error} </p>}
                    </div>

                </form>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {

    const idUser = context.query.new[1]
    const token = context.query.new[2]

    if (await UserService.validToken(token, idUser)) {
        return {
            props: {
                token: token,
                idUser: idUser
            }
        }
    }
    else {
        return {
            redirect: {
                permanent: false,
                destination: "/login",
            },
            props: {},
        };
    }
}

export default PasswordPage



