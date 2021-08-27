import asyncHandler from 'express-async-handler'
import User from './userModel.js'
import UserService from "./userService.js"

const authUser = asyncHandler(async (req, res) => {

    const { username, password } = req.body

    UserService.authUser(username, password, res)
        .then(userJson => {
            res.json(userJson)
        })
        .catch(error => {
            res.status(401).send(error.message)
        })
})

const getUser = asyncHandler(async (req, res) => {

    UserService.getUser(req.headers.cookie)
        .then(userJson => {
            res.json(userJson)
        })
        .catch(error => {
            res.status(401).send(error.message)
        })
})

const logoutUser = asyncHandler(async (req, res) => {

    UserService.logoutUser(res)
        .then(userJson => {
            res.json(userJson)
        })
        .catch(error => {
            res.status(401).send(error.message)
        })
})


const banUser = asyncHandler(async (req, res) => {

    const { username } = req.params

    UserService.banUser(username)
        .then(resp => {
            res.status(200).send(resp)
        })
        .catch(error => {
            res.status(400).send(error.message)
        })
})


const registerUser = asyncHandler((req, res) => {

    const { username, email, password } = req.body

    UserService.registerUser(username, email, password, req.headers.host)
        .then(message => {
            res.status(201).send(message)
        })
        .catch(error => {
            res.status(400).send(error.message)
        })
})


const checkIfUsernameTaken = asyncHandler(async (req, res) => {

    const { username } = req.params

    UserService.checkIfUsernameTaken(username)
        .then(taken => {
            res.json(taken)
        })
        .catch(error => {
            res.status(400).send(error.message)
        })
})


const activateUser = asyncHandler(async (req, res) => {

    const { username, token } = req.params
    const baseUrl = process.env.NODE_ENV == "development" ? "localhost:3000" : req.headers.host

    UserService.activateUser(username, token, res)
        .then(userJson => {
            res.redirect(`http://${baseUrl}/login?activated=true`)
        })
        .catch(error => {
            res.redirect(`http://${baseUrl}/activate?message=` + error.message)
        })
})


const resendVerificationToken = asyncHandler(async (req, res) => {

    const { email } = req.body

    UserService.resendVerificationToken(email, req.headers.host)
        .then(message => {
            res.status(201).send(message)
        })
        .catch(error => {
            res.status(400).send(error.message)
        })
})


const resetPassword = asyncHandler(async (req, res) => {

    const { email } = req.body

    UserService.resetPassword(email)
        .then(resp => {
            res.status(200).send("Check your email.")
        })
        .catch(error => {
            res.status(400).send(error.message)
        })
})


const newPassword = asyncHandler(async (req, res) => {

    const { id, password, token } = req.body

    UserService.newPassword(id, password, token)
        .then(resp => {
            res.status(200).send(resp)
        })
        .catch(error => {
            res.status(400).send(error.message)
        })
})


const getPublicUserInfo = asyncHandler(async (req, res) => {

    const { username } = req.params

    UserService.getPublicUserInfo(username)
        .then(resp => {
            res.status(200).send(resp)
        })
        .catch(error => {
            res.status(400).send(error.message)
        })
})








// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        await user.remove()
        res.json({ message: 'User removed' })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')

    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

export {
    authUser,
    logoutUser,
    registerUser,
    getPublicUserInfo,
    updateUserProfile,
    getUser,
    deleteUser,
    getUserById,
    updateUser,
    checkIfUsernameTaken,
    activateUser,
    resetPassword,
    newPassword,
    banUser,
    resendVerificationToken
}