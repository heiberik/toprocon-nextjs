import React from 'react'
import { Redirect } from 'react-router-dom'
import { getToken } from '../services/tokenService'


const IsLoggedIn = Component => (props) => {

    if (!getToken("userInfo")) {
        return <Component {...props} />
    }
    else return <Redirect to="/" />
}

export default IsLoggedIn