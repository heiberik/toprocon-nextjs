import Argument from './argumentModel.js'
import Topic from '../topic/topicModel.js'
import points from '../../utils/points.js'


class ArgumentService {


    addArgument = async (argument, topicId, type, user) => {

        const topic = await Topic.findById(topicId)
        if (!topic) throw new Error('Topic does not exist')

        try {

            const newArgument = await Argument.create({
                message: argument,
                user: user,
                topic
            })

            if (type === "cons") topic.cons.push(newArgument)
            else if (type === "pros") topic.pros.push(newArgument)

            await topic.save();

            await points.addTopicArgumentPoints(user, topic.user)

            return await Topic.findById(topicId)
                .populate({
                    path: 'cons',
                    populate: { path: 'user', model: 'User', select: 'username' },
                    match: { active: true },
                    options: { sort: { _id: -1 }, limit: 100 }
                })
                .populate({
                    path: 'pros',
                    populate: { path: 'user', model: 'User', select: 'username' },
                    match: { active: true },
                    options: { sort: { _id: -1 }, limit: 100 }
                })
                .populate({ path: 'user', model: 'User', select: 'username' })

        }
        catch (error) {
            throw new Error('Error making argument');
        }
    }


    getNewestArguments = async () => {
        return await Argument.find({ active: true })
            .sort({ "_id": -1 })
            .limit(2)
            .populate({ path: 'user', model: 'User', select: 'username' })
            .populate({ path: 'topic', model: 'Topic', select: 'name' })

    }

    deleteArgument = async (id) => {

        const argument = await Argument.findById(id)

        if (argument) {
            return await argument.remove()
        } else {
            throw new Error('Argument not found')
        }
    }

    updateArgument = async (argumentId, message) => {

        const argument = await Argument.findById(argumentId)

        if (argument) {
            argument.message = message
            return await argument.save()
        }
        else throw new Error('Argument not found');
    }

    addVote = async (argumentId, voteType, user) => {

        const argument = await Argument.findById(argumentId)

        if (!argument) throw new Error('Argument not found')

        console.log(user);
        if (voteType === "upvote") {
            if (user.upvotes.includes(argument._id)) {
                user.upvotes.pull({ _id: argument._id })
                argument.upvotes -= 1
                await points.removeUpvotePoints(user, argument.user)
            }
            else {
                user.upvotes.push(argument)
                argument.upvotes += 1
                await points.addUpvotePoints(user, argument.user)
                if (user.downvotes.includes(argument._id)) {
                    argument.downvotes -= 1
                    user.downvotes.pull({ _id: argument._id })
                    await points.removeDownvotePoints(user, argument.user)
                }
            }
        }

        if (voteType === "downvote") {
            if (user.downvotes.includes(argument._id)) {
                user.downvotes.pull({ _id: argument._id })
                argument.downvotes -= 1
                await points.removeDownvotePoints(user, argument.user)
            }
            else {
                user.downvotes.push(argument)
                argument.downvotes += 1
                await points.addDownvotePoints(user, argument.user)
                if (user.upvotes.includes(argument._id)) {
                    argument.upvotes -= 1
                    user.upvotes.pull({ _id: argument._id })
                    await points.removeUpvotePoints(user, argument.user)
                }
            }
        }
        console.log(user);

        await user.save()
        await argument.save()

        return await Argument.findById(argument._id).populate("user", "username")
    }

    getArgument = async (id) => {

        return await Argument.findById(id)

    }
}

export default new ArgumentService



