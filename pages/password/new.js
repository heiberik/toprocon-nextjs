import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import Input from '../../components/Input';
import { newPassword } from '../../services/userService';
import styles2 from "../../styles/Login.module.css"


const PasswordPage = () => {

    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")
    const [error, setError] = useState(null)
    const [disabled, setDisabled] = useState(false)

    //let { id, token } = useParams();
    //const history = useHistory();

    const onSubmitHandler = (e) => {
        /*
        e.preventDefault()
        if (password1.length < 6) {
            setError("Password is too short to be valid")
        }
        else if (password1 !== password2) {
            setError("Passwords do not match")
        }
        else {
            if (disabled) return
            setDisabled(true)
            newPassword(id, password2, token)
                .then(res => {
                    setDisabled(false)
                    history.push({
                        pathname: '/login',
                        state: { msg: "Verify your email!" }
                    })
                })
                .catch(error => {
                    setDisabled(false)
                    setPassword1("")
                    setPassword2("")
                    setError(error.response.data)
                })
        }
        */
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
            <div className={styles2["container-auth-card"]}>

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
                    s
                    <div className="container-loader">
                        <button type="submit" className="button-primary" style={{ marginBottom: "20px", marginTop: "15px" }}> Submit </button>
                        {error && <p className="text-error"> {error} </p>}
                    </div>

                </form>
            </div>
        </div>
    )
}

export default PasswordPage



