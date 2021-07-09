import express from 'express'
import rateLimit from "express-rate-limit"

const router = express.Router()

import {
    authUser,
    registerUser,
    updateUserProfile,
    getUsers,
    deleteUser,
    getPublicUserInfo,
    updateUser,
    checkIfUsernameTaken,
    activateUser,
    resetPassword,
    newPassword,
    banUser
} from './userController.js'

import { protect, admin } from '../../middleware/authMiddleware.js'

router.route('/')
    .post(rateLimit({ windowMs: 60000 * 60, max: 50 }), registerUser)
    .get(protect, admin, getUsers)

router.route('/login')
    .post(rateLimit({ windowMs: 60000, max: 50 }), authUser)

router.route('/profile')
    .put(protect, updateUserProfile)
//.get(protect, getUserProfile)

router.route('/username/:username')
    .get(checkIfUsernameTaken)

router.route('/verification/:username/:token')
    .get(activateUser)

router.route('/password/reset')
    .post(resetPassword)

router.route('/password/new')
    .post(newPassword)

router.route('/:username/ban')
    .post(protect, admin, banUser)

router.route('/:username')
    .delete(protect, admin, deleteUser)
    .get(getPublicUserInfo)
    .put(protect, admin, updateUser)

export default router