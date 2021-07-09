import asyncHandler from 'express-async-handler'
import ArgumentService from "./argumentService.js"


const addArgument = asyncHandler(async (req, res) => {

    const { argument, topicId, type } = req.body
    
    ArgumentService.addArgument(argument, topicId, type, req.user)
        .then(argumentJson => {
            res.status(201).json(argumentJson)
        })
        .catch(error => {
            res.status(401).send(error.message)
        })
})

const getNewestArguments = asyncHandler(async (req, res) => {
    
    ArgumentService.getNewestArguments()
        .then(args => {
            res.json(args)
        })
        .catch(error => {
            res.status(400).send(error.message)
        })
})

const deleteArgument = asyncHandler(async (req, res) => {

    ArgumentService.deleteArgument(req.params.id)
        .then(() => {
            res.json({ message: 'Argument removed' })
        })
        .catch(error => {
            res.status(401).send(error.message)
        })
})

const updateArgument = asyncHandler(async (req, res) => {
    
    const { argument } = req.body
    
    ArgumentService.updateArgument(req.params.id, argument)
        .then(argumentJson => {
            res.json(argumentJson)
        })
        .catch(error => {
            res.status(401).send(error.message)
        })
            
})

const addVote = asyncHandler(async (req, res) => {
    
    const { voteType } = req.body
    
    ArgumentService.addVote(req.params.id, voteType, req.user)
        .then(argumentJson => {
            res.json(argumentJson)
        })
        .catch(error => {
            res.status(401).send(error.message)
        })   
})

const getArgument = asyncHandler(async (req, res) => {
    
    ArgumentService.getArgument(req.params.id)
        .then(argument => {
            res.json(argument)
        })
        .catch(error => {
            res.status(400).send(error.message)
        })
})

export {
    addArgument,
    deleteArgument,
    updateArgument,
    addVote,
    getArgument,
    getNewestArguments
}