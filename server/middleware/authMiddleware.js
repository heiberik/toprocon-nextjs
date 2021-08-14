import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../modules/user/userModel.js'
import cookie from "cookie"



const protectSocket = (socket, next) => {
    if (socket.handshake.query && socket.handshake.query.token) {
        jwt.verify(socket.handshake.query.token, process.env.JWT_SECRET, function (err, decoded) {
            if (err) return next(new Error('Authentication error'));
            socket.decoded = decoded;
            next();
        });
    }
    else next(new Error('Authentication error'));
}


const protect = asyncHandler(async (req, res, next) => {

    try {

        var cookies = cookie.parse(req.headers.cookie);

        const decoded = await jwt.verify(JSON.parse(cookies.jwt), process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id).select('-password')
       
        if (!req.user) throw new Error('User does not exist')
        if (req.user.banned) throw new Error('User is banned')
        if (!req.user.active) throw new Error('User must confirm email address')

        next()
    }
    catch (e) {
        console.log(e);
        res.status(401)
        throw new Error('Not authorized, token failed')
    }
})

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error('Not authorized as an admin')
    }
}


const moderator = (req, res, next) => {
    if (req.user && req.user.isMod) {
        next()
    } else {
        res.status(401)
        throw new Error('Not authorized as a moderator')
    }
}

export { protect, admin, protectSocket, moderator }