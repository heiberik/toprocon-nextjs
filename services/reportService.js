import axios from 'axios'
import { getToken } from './tokenService'

const url = "/api/reports"

export const addReport = (type, reportedId, description) => {
    return axios.post(`${url}`, { type, reportedId, description }, { headers: { Authorization: `Bearer ` } })
}

export const getReport = () => {
    return axios.get(`${url}` , { headers: { Authorization: `Bearer ` } })
}

export const getAdminReports = () => {
    return axios.get(`${url}/admin`, { headers: { Authorization: `Bearer ` } })
}

export const getModeratorReports = () => {
    return axios.get(`${url}/moderator`, { headers: { Authorization: `Bearer ` } })
}

export const decideReport = (decision, id) => {
    return axios.post(`${url}/${id}/decide`, { decision },{ headers: { Authorization: `Bearer ` } })
}

export const modReport = (decision, id) => {
    return axios.post(`${url}/${id}/mod`, { decision },{ headers: { Authorization: `Bearer ` } })
}

export const increaseReport = (id) => {
    return axios.post(`${url}/${id}/yes`, {} ,{ headers: { Authorization: `Bearer ` } })
}

export const decreaseReport = (id) => {
    return axios.post(`${url}/${id}/no`, {}, { headers: { Authorization: `Bearer ` } })
}



