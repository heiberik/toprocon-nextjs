import express from 'express'

const router = express.Router()

import {
    addReport,
    getReport,
    increaseReport,
    decreaseReport
} from './reportController.js'

import { protect, admin, moderator } from '../../middleware/authMiddleware.js'

router.route('/')
    .post(protect, addReport)
    .get(protect, getReport)

router.route('/:id/yes')
    .post(protect, increaseReport)

router.route('/:id/no')
    .post(protect, decreaseReport)

export default router