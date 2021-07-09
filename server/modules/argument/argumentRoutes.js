import express from 'express'
import rateLimit from "express-rate-limit"


const router = express.Router()

import {
    addArgument,
    getNewestArguments, 
    deleteArgument,
    updateArgument,
    addVote,
    getArgument
} from './argumentController.js'

import { protect, admin } from '../../middleware/authMiddleware.js'

router.route('/')
    .post(protect, rateLimit({ windowMs: 60 * 1000, max: 1, message: "You can only add an argument every 1 minute." }), addArgument)

router.route('/newest')
    .get(getNewestArguments)

router.route('/:id')
    .delete(protect, admin, deleteArgument)
    .put(protect, admin, updateArgument)
    .get(protect, getArgument)

router.route('/:id/vote')
    .post(protect, addVote)

export default router