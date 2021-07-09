import asyncHandler from 'express-async-handler'
import BoardService from "./boardService.js"


const getLeaderboardTotal = asyncHandler(async (req, res) => {
    
    BoardService.getLeaderboardTotal()
        .then(leaderboard => {
            res.status(200).json(leaderboard)
        })
        .catch(error => {
            res.status(400).send(error.message)
        })
})

const getLeaderboardMod = asyncHandler(async (req, res) => {
    
    BoardService.getLeaderboardMod()
        .then(leaderboard => {
            res.status(200).json(leaderboard)
        })
        .catch(error => {
            res.status(400).send(error.message)
        })
})

const getLeaderboardTopic = asyncHandler(async (req, res) => {
    
    BoardService.getLeaderboardTopic()
        .then(leaderboard => {
            res.status(200).json(leaderboard)
        })
        .catch(error => {
            res.status(400).send(error.message)
        })
})

const getLeaderboardArgument = asyncHandler(async (req, res) => {
    
    BoardService.getLeaderboardArgument()
        .then(leaderboard => {
            res.status(200).json(leaderboard)
        })
        .catch(error => {
            res.status(400).send(error.message)
        })
})

export {
    getLeaderboardTotal,
    getLeaderboardMod,
    getLeaderboardTopic,
    getLeaderboardArgument
}