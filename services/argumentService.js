import axios from 'axios'

const url = "/api/arguments"

export const addArgument = (argument, topicId, type) => {
    return axios.post(`${url}`, { argument, topicId, type })
}

export const getNewestArguments = () => {
    return axios.get(`${url}/newest`)
}

export const getArgument = (id) => {
    return axios.get(`${url}/${id}`)
}

export const deleteArgument = (id) => {
    return axios.delete(`${url}/${id}`)
}

export const updateArgument = (id, argument) => {
    return axios.put(`${url}/${id}`, { argument })
}

export const addVote = (id, voteType) => {
    return axios.post(`${url}/${id}/vote`, { voteType })
}