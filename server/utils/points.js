import User from "../modules/user/userModel.js"

const getUpvote = 5
const giveUpvote = 1
const getDownvote = -3
const giveDownvote = -1

const argumentAdded = 20
const argumentAddedToYourTopic = 1

const goodMod = 20;
const badMod = -30;
const madeDeletedItem = -100;

const addUpvotePoints = async (fromUser, toUserId) => {

    const toUser = await User.findById(toUserId).select('-password')

    toUser.argumentPoints += getUpvote
    toUser.pointsTotal += getUpvote

    fromUser.argumentPoints += giveUpvote
    fromUser.pointsTotal += giveUpvote

    await toUser.save()
}

const removeUpvotePoints = async (fromUser, toUserId) => {

    const toUser = await User.findById(toUserId).select('-password')

    toUser.argumentPoints -= getUpvote
    toUser.pointsTotal -= getUpvote

    fromUser.argumentPoints -= giveUpvote
    fromUser.pointsTotal -= giveUpvote

    await toUser.save()
}

const addDownvotePoints = async (fromUser, toUserId) => {

    const toUser = await User.findById(toUserId).select('-password')

    toUser.argumentPoints += getDownvote
    toUser.pointsTotal += getDownvote

    fromUser.argumentPoints += giveDownvote
    fromUser.pointsTotal += giveDownvote

    await toUser.save()
}

const removeDownvotePoints = async (fromUser, toUserId) => {

    const toUser = await User.findById(toUserId).select('-password')

    toUser.argumentPoints -= getDownvote
    toUser.pointsTotal -= getDownvote

    fromUser.argumentPoints -= giveDownvote
    fromUser.pointsTotal -= giveDownvote

    await toUser.save()
}

const addTopicArgumentPoints = async (addUser, TopicOwnerId) => {

    const toUser = await User.findById(TopicOwnerId).select('-password')

    toUser.topicPoints += argumentAddedToYourTopic
    toUser.pointsTotal += argumentAddedToYourTopic

    addUser.argumentPoints += argumentAdded
    addUser.pointsTotal += argumentAdded

    await toUser.save()
    await addUser.save()
}


const AddModPoints = async (report, deleted, itemCreator) => {

    report.agreed.forEach(userId => {
        User.findById(userId)
            .then(user => {
                if (deleted) {
                    user.modPoints += goodMod
                    user.pointsTotal += goodMod
                }
                else {
                    user.modPoints += badMod
                    user.pointsTotal += badMod
                }
                user.save()
            })
    })

    report.disagreed.forEach(userId => {
        User.findById(userId)
            .then(user => {
                if (deleted) {
                    user.modPoints += badMod
                    user.pointsTotal += badMod
                }
                else {
                    user.modPoints += goodMod
                    user.pointsTotal += goodMod
                }
                user.save()
            })
    })

    const user = await User.findById(report.user)

    if (deleted) {
        user.modPoints += goodMod
        user.pointsTotal += goodMod
    }
    else {
        user.modPoints += badMod
        user.pointsTotal += badMod
    }

    user.save()

    if (deleted && itemCreator) {

        const creator = await User.findById(itemCreator)
        if (report.type === "topic"){
             creator.topicPoints += madeDeletedItem
             creator.pointsTotal += madeDeletedItem
        }
        if (report.type === "argument"){
             creator.argumentPoints += madeDeletedItem
             creator.pointsTotal += madeDeletedItem
        }
        creator.save()
    }
}

export default {
    addTopicArgumentPoints,
    addUpvotePoints,
    removeUpvotePoints,
    addDownvotePoints,
    removeDownvotePoints,
    AddModPoints
}