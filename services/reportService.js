import axios from 'axios'

const url = "/api/reports"

export const addReport = (type, reportedId, description) => {
    return axios.post(`${url}`, { type, reportedId, description })
}

export const getReport = () => {
    return axios.get(`${url}` )
}

export const getAdminReports = () => {
    return axios.get(`${url}/admin`)
}

export const getModeratorReports = () => {
    return axios.get(`${url}/moderator`)
}

export const decideReport = (decision, id) => {
    return axios.post(`${url}/${id}/decide`, { decision })
}

export const modReport = (decision, id) => {
    return axios.post(`${url}/${id}/mod`, { decision })
}

export const increaseReport = (id) => {
    return axios.post(`${url}/${id}/yes`, {} )
}

export const decreaseReport = (id) => {
    return axios.post(`${url}/${id}/no`, {})
}



