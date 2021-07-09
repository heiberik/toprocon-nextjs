import axios from 'axios'
import { getToken } from './tokenService.js'

const url = "/api/arguments"

export const addArgument = (argument, topicId, type) => {
    return axios.post(`${url}`, { argument, topicId, type }, { headers: { Authorization: `Bearer ${getToken("userInfo").token}` } })
}

export const getNewestArguments = () => {
    return axios.get(`${url}/newest`)
}

export const getArgument = (id) => {
    return axios.get(`${url}/${id}`, { headers: { Authorization: `Bearer ${getToken("userInfo").token}` } })
}

export const deleteArgument = (id) => {
    return axios.delete(`${url}/${id}`, { headers: { Authorization: `Bearer ${getToken("userInfo").token}` } })
}

export const updateArgument = (id, argument) => {
    return axios.put(`${url}/${id}`, { argument },{ headers: { Authorization: `Bearer ${getToken("userInfo").token}` } })
}

export const addVote = (id, voteType) => {
    return axios.post(`${url}/${id}/vote`, { voteType }, { headers: { Authorization: `Bearer ${getToken("userInfo").token}` } })
}