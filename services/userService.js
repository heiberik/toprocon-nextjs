import axios from 'axios'
import { removeToken, getToken } from './tokenService'

const url = "/api/users"

export const loginUser = (username, password) => {
    return axios.post(`${url}/login`, { username, password })
}

export const registerUser = (username, email, password) => {
    return axios.post(`${url}`, {username, email, password })
}

export const logoutUser = () => {
    removeToken('userInfo')
}

export const checkIfUsernameTaken = (username) => {
    return axios.get(`${url}/username/${username}`)
}

export const banUser = (username) => {
    return axios.post(`${url}/${username}/ban`, {} ,{ headers: { Authorization: `Bearer ${getToken("userInfo").token}` }})
}

export const getPublicUserInfo = (username) => {
    return axios.get(`${url}/${username}`)
}

export const resetPassword = (email) => {
    return axios.post(`${url}/password/reset`, { email })
}

export const newPassword = (id, password, token) => {
    return axios.post(`${url}/password/new`, { id, password, token })
}