import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import "./Input.css"

const Input = ({ label, icon, handler, value, type, placeholder, name, validation, textarea }) => {

    const [valid, setValid] = useState(false)

    useEffect(() => {
        async function validate(value) {
            if (await validation(value)) setValid(true);
            else setValid(false)
        }
        validate(value)
    }, [value, validation])


    if (textarea) {
        return (
            <div className="input-wrapper">
                <label className="input-label" htmlFor={name}> {label} </label>
                <div className="container-input">
                    <div> {valid ? <FontAwesomeIcon icon={faCheck} className="icon-valid" color="rgb(253, 193, 19)" /> : icon} </div>
                    <textarea
                        type={type}
                        value={value}
                        name={name}
                        id={name}
                        className="input-style"
                        onChange={handler}
                        placeholder={placeholder}
                        autoComplete="off" />
                </div>
            </div>
        )
    }
    else return (
        <div className="input-wrapper">
            <label className="input-label" htmlFor={name}> {label} </label>
            <div className="container-input">
                <div> {valid ? <FontAwesomeIcon icon={faCheck} className="icon-valid" color="rgb(253, 193, 19)"/> : icon} </div>
                <input
                    type={type}
                    value={value}
                    name={name}
                    className="input-style"
                    onChange={handler}
                    placeholder={placeholder}
                    id={name}
                    autoComplete="off" />
            </div>
        </div>
    )
}

export default Input