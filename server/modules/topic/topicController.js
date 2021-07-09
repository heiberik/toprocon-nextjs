import asyncHandler from 'express-async-handler'
import TopicService from "./topicService.js"


const addTopic = asyncHandler(async (req, res) => {

    const { name, description, resources } = req.body
    
    TopicService.addTopic(name, description, resources, req.user)
        .then(topicJson => {
            res.status(201).json(topicJson)
        })
        .catch(error => {
            res.status(401).send(error.message)
        })
})

const getTopics = asyncHandler(async (req, res) => {

    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    const search = req.query.search;

    TopicService.getTopics(limit, skip, search)
        .then(topics => {
            res.json(topics)
        })
        .catch(error => {
            res.status(401).send(error.message)
        })
})

const getTopicsNew = asyncHandler(async (req, res) => {

    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);

    TopicService.getTopicsNew(limit, skip)
        .then(topics => {
            res.json(topics)
        })
        .catch(error => {
            res.status(401).send(error.message)
        })
})

const getTopicsControversial = asyncHandler(async (req, res) => {

    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);

    TopicService.getTopicsControversial(limit, skip)
        .then(topics => {
            res.json(topics)
        })
        .catch(error => {
            res.status(401).send(error.message)
        })
})


const deleteTopic = asyncHandler(async (req, res) => {
    
    TopicService.deleteTopic(req.params.id)
        .then(() => {
            res.json({ message: 'Topic removed' })
        })
        .catch(error => {
            res.status(401).send(error.message)
        })
})

const getTopicById = asyncHandler(async (req, res) => {
    
    TopicService.getTopicById(req.params.id)
        .then(topicJson => {
            res.json(topicJson)
        })
        .catch(error => {
            res.status(401).send(error.message)
        })
})

const getTopicByIdNew = asyncHandler(async (req, res) => {
    
    TopicService.getTopicByIdNew(req.params.id)
        .then(topicJson => {
            res.json(topicJson)
        })
        .catch(error => {
            res.status(401).send(error.message)
        })
})

const getTopicByIdControversial = asyncHandler(async (req, res) => {
    
    TopicService.getTopicByIdControversial(req.params.id)
        .then(topicJson => {
            res.json(topicJson)
        })
        .catch(error => {
            res.status(401).send(error.message)
        })
})





const updateTopic = asyncHandler(async (req, res) => {

    const { name, description, resources } = req.body
    
    TopicService.updateTopic(req.params.id, name, description, resources)
        .then(topicJson => {
            res.json(topicJson)
        })
        .catch(error => {
            res.status(401).send(error.message)
        })
})



export {
    getTopics,
    deleteTopic,
    getTopicById,
    updateTopic,
    addTopic,
    getTopicsNew,
    getTopicsControversial,
    getTopicByIdNew,
    getTopicByIdControversial
}