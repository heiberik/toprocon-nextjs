import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import { createServer } from 'http'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import socketIO from './config/socketio.js'
import userRoutes from './modules/user/userRoutes.js'
import reportRoutes from "./modules/report/reportRoutes.js"
import topicRoutes from './modules/topic/topicRoutes.js'
import boardRoutes from "./modules/leaderboard/boardRoutes.js"
import argumentRoutes from './modules/argument/argumentRoutes.js'
import helmet from "helmet"
import rateLimit from "express-rate-limit"
import cors from "cors"

/*

TODOS: 



*/

dotenv.config()

connectDB()

const app = express()
app.use(cors());

const server = createServer(app)

//socketIO(server)

app.use(express.json())
app.use(express.static('./client/build'))

//app.use(helmet())
app.use("/api/", rateLimit({
    windowMs: 60 * 1000,
    max: 600
}))

app.use('/api/users', userRoutes)
app.use('/api/topics', topicRoutes)
app.use('/api/arguments', argumentRoutes)
app.use('/api/reports', reportRoutes)
app.use("/api/leaderboards", boardRoutes)



const __dirname = path.resolve()
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, "./client/build")));
    app.get("*", function (request, response) {
        response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
    });
}

app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000

server.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))