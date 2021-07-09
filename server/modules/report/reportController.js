import asyncHandler from 'express-async-handler'
import ReportService from "./reportService.js"


const addReport = asyncHandler(async (req, res) => {

    const { type, reportedId, description } = req.body
    
    ReportService.addReport(type, reportedId, description, req.user)
        .then(report => {
            res.status(201).json(report)
        })
        .catch(error => {
            res.status(400).send(error.message)
        })
})

const getReport = asyncHandler(async (req, res) => {
    
    ReportService.getReport(req.user)
        .then(report => {
            res.status(200).json(report)
        })
        .catch(error => {
            res.status(400).send(error.message)
        })
})

const increaseReport = asyncHandler(async (req, res) => {

    const { id } = req.params
    
    ReportService.increaseReport(req.user, id)
        .then(report => {
            res.status(201).json(report)
        })
        .catch(error => {
            res.status(400).send(error.message)
        })
})

const decreaseReport = asyncHandler(async (req, res) => {
    
    const { id } = req.params

    ReportService.decreaseReport(req.user, id)
        .then(report => {
            res.status(201).json(report)
        })
        .catch(error => {
            res.status(400).send(error.message)
        })
})


export {
    addReport,
    getReport,
    increaseReport,
    decreaseReport
}

    

