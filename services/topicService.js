import axios from 'axios'

const url = "/api/topics"

export const addTopic = (name, description, resources) => {
    return axios.post(`${url}`, { name, description, resources })
}

export const getTopics = (sortBy, skip, limit) => {
    if (sortBy === "top") return axios.get(`${url}?limit=${limit}&skip=${skip}`)
    if (sortBy === "new") return axios.get(`${url}/new?limit=${limit}&skip=${skip}`)
    if (sortBy === "controversial") return axios.get(`${url}/controversial?limit=${limit}&skip=${skip}`)
}

export const searchTopic = (query, skip, limit) => {
    return axios.get(`${url}?search=${query}&limit=${limit}&skip=${skip}`)
}


export const deleteTopic = (id) => {
    return axios.delete(`${url}/${id}`)
}

export const getTopicById = (id, sortBy) => {
    if (sortBy === "top") return axios.get(`${url}/${id}`)
    if (sortBy === "new") return axios.get(`${url}/${id}/new`)
    if (sortBy === "controversial") return axios.get(`${url}/${id}/controversial`)
    
}

export const updateTopic = (id, name, description, resources) => {
    return axios.put(`${url}/${id}`, { name, description, resources })
}
