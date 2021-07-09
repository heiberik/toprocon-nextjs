//import userRoutes from './pages/api/user/userRoutes.js'
import topicRoutes from './modules/topic/topicRoutes.js'

/*
import reportRoutes from "./pages/api/report/reportRoutes.js"
import boardRoutes from "./pages/api/leaderboard/boardRoutes.js"
import argumentRoutes from './pages/api/argument/argumentRoutes.js'
*/

import connectDB from './config/db.js'
import express from 'express'
import next from 'next'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
    .then(() => {

        const server = express()

        connectDB()

        server.use('/api/topics', topicRoutes)

        /*
        app.use('/api/users', userRoutes)
        app.use('/api/arguments', argumentRoutes)
        app.use('/api/reports', reportRoutes)
        app.use("/api/leaderboards", boardRoutes)
        */

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(3000, (err) => {
            if (err) throw err
            console.log('> Ready on http://localhost:3000')
        })
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })