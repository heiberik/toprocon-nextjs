import express from 'express'
import rateLimit from "express-rate-limit"

const router = express.Router()

import {
    authUser,
    logoutUser,
    registerUser,
    updateUserProfile,
    getUser,
    deleteUser,
    getPublicUserInfo,
    updateUser,
    checkIfUsernameTaken,
    activateUser,
    resetPassword,
    newPassword,
    banUser,
    resendVerificationToken
} from './userController.js'

import { protect, admin } from '../../middleware/authMiddleware.js'

router.route('/')
    .post(rateLimit({ windowMs: 60000 * 60, max: 50 }), registerUser)
    .get(getUser)

router.route('/login')
    .post(rateLimit({ windowMs: 60000, max: 50 }), authUser)

router.route('/logout')
    .post(rateLimit({ windowMs: 60000, max: 50 }), logoutUser)

router.route('/profile')
    .put(protect, updateUserProfile)
//.get(protect, getUserProfile)

router.route('/username/:username')
    .get(checkIfUsernameTaken)

router.route('/verification/:username/:token')
    .get(activateUser)

router.route('/verification/resendtoken')
    .post(rateLimit({ windowMs: 60000, max: 5 }), resendVerificationToken)

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