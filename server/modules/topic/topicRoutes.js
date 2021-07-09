import express from 'express'
import rateLimit from "express-rate-limit"

const router = express.Router()

import {
    addTopic,
    getTopics,
    deleteTopic,
    getTopicById,
    updateTopic,
    getTopicsNew,
    getTopicsControversial,
    getTopicByIdNew,
    getTopicByIdControversial
} from './topicController.js'

import { protect, admin } from '../../middleware/authMiddleware.js'

router.route('/')
    .post(protect, rateLimit({ windowMs: 24 * 60 * 60 * 1000, max: 1 }), addTopic)
    .get(getTopics)

router.route('/new')
    .get(getTopicsNew)

router.route('/controversial')
    .get(getTopicsControversial)

router.route('/:id')
    .delete(protect, admin, deleteTopic)
    .get(getTopicById)
    .put(protect, admin, updateTopic)

router.route('/:id/new')
    .get(getTopicByIdNew)

router.route('/:id/controversial')
    .get(getTopicByIdControversial)

export default router