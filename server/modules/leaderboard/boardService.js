import User from '../user/userModel.js'


class ReportService {

    getLeaderboardTotal = async () => {

        const users = await User.find({ active: true, banned: false, isAdmin: false })
            .sort({ "pointsTotal": -1 })
            .limit(500)

        return users.map(user => {
            return {
                username: user.username,
                points: user.pointsTotal,
                id: user._id
            }
        })
    }

    getLeaderboardMod = async () => {

        const users = await User.find({ active: true, banned: false, isAdmin: false })
            .sort({ "modPoints": -1 })
            .limit(500)

        return users.map(user => {
            return {
                username: user.username,
                points: user.modPoints,
                id: user._id
            }
        })
    }

    getLeaderboardTopic = async () => {

        const users = await User.find({ active: true, banned: false, isAdmin: false })
            .sort({ "topicPoints": -1 })
            .limit(500)

        return users.map(user => {
            return {
                username: user.username,
                points: user.topicPoints,
                id: user._id
            }
        })
    }

    getLeaderboardArgument = async () => {

        const users = await User.find({ active: true, banned: false, isAdmin: false })
            .sort({ "argumentPoints": -1 })
            .limit(500)

        return users.map(user => {
            return {
                username: user.username,
                points: user.argumentPoints,
                id: user._id
            }
        })
    }
}

export default new ReportService
