import axios from 'axios'

const url = "/api/leaderboards"

export const getLeaderboard = (type) => {
    return axios.get(`${url}/${type}`)
}