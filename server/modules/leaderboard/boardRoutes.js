import express from 'express'

const router = express.Router()

import {
    getLeaderboardTotal,
    getLeaderboardMod,
    getLeaderboardTopic,
    getLeaderboardArgument
} from './boardController.js'

router.route('/total')
    .get(getLeaderboardTotal)

router.route('/mod')
    .get(getLeaderboardMod)

router.route('/topic')
    .get(getLeaderboardTopic)

router.route('/argument')
    .get(getLeaderboardArgument)

export default router