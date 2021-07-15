import userRoutes from './modules/user/userRoutes.js'
import topicRoutes from './modules/topic/topicRoutes.js'
import reportRoutes from "./modules/report/reportRoutes.js"
import boardRoutes from "./modules/leaderboard/boardRoutes.js"
import argumentRoutes from './modules/argument/argumentRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

import bp from 'body-parser'


import connectDB from './config/db.js'
import express from 'express'
import next from 'next'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
    .then(() => {

        const server = express()

        server.use(bp.json())
        server.use(bp.urlencoded({ extended: true }))

        connectDB()

        server.use('/api/topics', topicRoutes)
        server.use('/api/users', userRoutes)
        server.use('/api/arguments', argumentRoutes)
        server.use('/api/reports', reportRoutes)
        server.use("/api/leaderboards", boardRoutes)


        server.get('*', (req, res) => {
            return handle(req, res)
        })

        const PORT = process.env.PORT || 3000
        server.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))

        server.use(notFound)
        server.use(errorHandler)
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })