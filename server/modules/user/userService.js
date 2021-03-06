import generateToken from '../../utils/generateToken.js'
import Token from '../token/tokenModel.js'
import User from './userModel.js'
import crypto from 'crypto'
import templates from "../../utils/templates.js"
import mailer from '../../utils/sendMail.js'
import Argument from '../argument/argumentModel.js'
import Topic from '../topic/topicModel.js'
import dayjs from "dayjs"
import cookie from "cookie"
import jwt from 'jsonwebtoken'
import profanity from "@2toad/profanity"

class UserService {

    authUser = async (username, password, res) => {

        const user = await User.findOne({ username })
        if (!user) throw new Error('Invalid email or password.');   

        const passwordMatch = await user.matchPassword(password)
        if (!passwordMatch) throw new Error('Invalid email or password.');

        if (user.banned) throw new Error('User is banned.');
        if (!user.active) throw new Error('Email has not been verified.');

        const token = generateToken(user._id)

        res.cookie("jwt", JSON.stringify(token), {
            secure: process.env.NODE_ENV !== "development",
            httpOnly: true,
            expires: dayjs().add(30, "days").toDate(),
        });

        return {
            _id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            isMod: user.isMod,
            token: token
        }
    }

    logoutUser = async (res) => {
        res.clearCookie("jwt")
        return {
            success: true
        }
    }

    getUser = async (cookies) => {

    
        if (!cookies) return null
        const parsedCookies = cookie.parse(cookies)
        if (!parsedCookies.jwt) return null

        try {
            const decoded = await jwt.verify(JSON.parse(parsedCookies.jwt), process.env.JWT_SECRET)
            const user = await User.findById(decoded.id)  
            if (!user) throw new Error('User not found.');

            return JSON.stringify({
                _id: user._id,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin,
                isMod: user.isMod,
            })
        }
        catch(e){
            console.log(e);
            return null
        }   
    }

    banUser = async (username) => {

        const user = await User.findOne({ username })
        if (!user) throw new Error("Can't find user.")

        if (user.isAdmin) throw new Error("Can't ban admin.")

        if (user.banned) user.banned = false;
        else user.banned = true;

        await user.save()

        let userInfo = await this.getPublicUserInfo(username)
        return userInfo;
    }

    getPublicUserInfo = async (username) => {

        const user = await User.findOne({ username })
        if (!user) throw new Error('User does not exist.');


        let addedArguments = await Argument.find({ user }).populate("user", "username")
        let receivedUpvotes = 0
        let receivedDownvotes = 0

        addedArguments = addedArguments.sort(function (a, b) {
            return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
        });

        addedArguments.forEach((argument) => {
            receivedUpvotes += argument.upvotes
            receivedDownvotes += argument.downvotes
        })

        let addedTopics = await Topic.find({ user })

        return {
            _id: user._id,
            username: user.username,
            isAdmin: user.isAdmin,
            totalUpvotes: user.upvotes.length,
            totalDownvotes: user.downvotes.length,
            totalArgumentsAdded: addedArguments.length,
            receivedUpvotes,
            receivedDownvotes,
            banned: user.banned,
            bestArguments: addedArguments.slice(0, 3),
            addedTopics: addedTopics.map(topic => { return { name: topic.name, id: topic._id } })
        }
    }

    registerUser = async (username, email, password, host) => {

        const userExistsUsername = await User.findOne({ username })
        if (userExistsUsername) throw new Error('Username already exists')

        const userExistsEmail = await User.findOne({ email })
        if (userExistsEmail) throw new Error('Email already in use')

        const options = new profanity.ProfanityOptions();
        options.wholeWord = false;
        const prof = new profanity.Profanity(options);
        prof.addWords(['admin', 'mod', "moderator", "administrator", "toprocon"]);

        const isProfane = prof.exists(username);

        if (isProfane) {
            throw new Error('Username is not allowed')
        };

        const user = await User.create({ username, email, password })

        const token = await Token.create({
            user: user,
            token: crypto.randomBytes(64).toString('hex'),
            type: "email-verification"
        })

        const baseUrl = process.env.NODE_ENV == "development" ? "localhost:3000" : host

        const mailOptions = {
            from: "Toprocon <" + process.env.MAIL_USERNAME + ">",
            to: user.email,
            subject: "Account Verification Link",
            html: templates.verifyAccount(user, token, baseUrl)
        }

        let mailSent = await mailer.sendMail(mailOptions);
        if (!mailSent) {
            await User.deleteOne({ _id: user._id })
            throw new Error('Technical issue while sending verification mail')
        }
        else return "A verification email has been sent to " + user.email + "."
    }

    resendVerificationToken = async (email, host) => {

        const user = await User.findOne({ email })
        if (!user) throw new Error('User with this email does not exist')
        if (user.active) throw new Error('User is allready activated')

        const token = await Token.create({
            user: user,
            token: crypto.randomBytes(64).toString('hex'),
            type: "email-verification"
        })

        const baseUrl = process.env.NODE_ENV == "development" ? "localhost:3000" : host

        const mailOptions = {
            from: "Toprocon <" + process.env.MAIL_USERNAME + ">",
            to: user.email,
            subject: "Account Verification Link",
            html: templates.verifyAccount(user, token, baseUrl)
        }

        let mailSent = await mailer.sendMail(mailOptions);
        if (!mailSent) {
            throw new Error('Technical issue while resending verification mail. Try again later.')
        }
        else return "A verification email has been sent to " + user.email + "."
    }   

    activateUser = async (username, token, res) => {

        const verifyToken = await Token.findOne({ token })
        if (!verifyToken) throw new Error('Your verification link may have expired.');

        const user = await User.findOne({ username })
        if (!verifyToken.user.equals(user._id)) throw new Error('Invalid verification link.');
        if (!user) throw new Error("Invalid verification link. Can't find user.")
        
        user.active = true
        await user.save()

        const newToken = generateToken(user._id)

        res.cookie("jwt", JSON.stringify(newToken), {
            secure: process.env.NODE_ENV !== "development",
            httpOnly: true,
            expires: dayjs().add(30, "days").toDate(),
        });

        return true
    }

    checkIfUsernameTaken = async (username) => {

        const user = await User.findOne({ username })

        if (user) return true
        else return false
    }

    resetPassword = async (email, host) => {

        const user = await User.findOne({ email })
        if (!user) throw new Error("Can't find user.")

        const token = await Token.create({
            user: user,
            token: crypto.randomBytes(64).toString('hex'),
            type: "password-reset"
        })

        const baseUrl = process.env.NODE_ENV == "development" ? "localhost:3000" : host

        const mailOptions = {
            from: "Toprocon <" + process.env.MAIL_USERNAME + ">",
            to: user.email,
            subject: "Reset password Link",
            html: templates.resetPassword(user, token, baseUrl)
        }

        let mailSent = await mailer.sendMail(mailOptions);
        if (!mailSent) throw new Error('Technical issue.')
        else return "Check your email."
    }

    validToken = async (token, user) => {

        const verifyToken = await Token.findOne({ token }) 

        if (!verifyToken) return false
        if (!verifyToken.user.equals(user)) return false
        
        return true
    }

    newPassword = async (id, password, token) => {

        const user = await User.findOne({ _id: id })
        if (!user) throw new Error("Can't find user.")

        const cToken = await Token.findOne({ token })
        if (!cToken) throw new Error("Token is not valid.")

        if (!cToken.user.equals(user._id)) throw new Error("Invalid token.")

        user.password = password;
        await user.save()
        cToken.delete();

        return "New password saved"
    }
}

export default new UserService



