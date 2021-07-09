import React from 'react'
import { Redirect } from 'react-router-dom'
import { getToken } from '../services/tokenService'


const AuthProtect = Component => (props) => {

    const path = window.location.pathname

    if (getToken("userInfo")) {
        return <Component {...props} />
    }
    else return <Redirect to={{ pathname:"/login", state: { from: path } }}/>
}

export default AuthProtect