import Topic from './topicModel.js'
import points from '../../utils/points.js'


class TopicService {

    addTopic = async (name, description, resources, user) => {

        const topicExists = await Topic.findOne({ name })

        if (topicExists) {
            throw new Error('Topic already exists')
        }

        try {
            return await Topic.create({ name, description, resources, user })
        }
        catch (error) {
            throw new Error('Error making topic');
        }
    }


    getTopics = async (limit, skip, search) => {

        let topics = null

        if (search) {
            topics = await Topic.find({ name: { $regex: search, $options: "i" }, active: true })
                .sort({ "_id": -1 })
                .skip(skip)
                .limit(limit)
                .populate({ path: 'user', model: 'User', select: 'username' })
        }
        else {
            topics = await Topic.find({ active: true })
                .sort({ "totalProsCons": -1, "_id": -1 })
                .skip(skip)
                .limit(limit)
                .populate({ path: 'user', model: 'User', select: 'username' })
        }

        topics = topics.map(topic => {
            return {
                _id: topic._id,
                name: topic.name,
                username: topic.user.username,
                prosLength: topic.pros.length,
                consLength: topic.cons.length
            }
        })

        return JSON.parse(JSON.stringify(topics))
    }


    getTopicsNew = async (limit, skip) => {

        let topics = await Topic.find({ active: true })
            .sort({ "_id": -1 })
            .skip(skip)
            .limit(limit)
            .populate({ path: 'user', model: 'User', select: 'username' })

        topics = topics.map(topic => {
            return {
                _id: topic._id,
                name: topic.name,
                username: topic.user.username,
                prosLength: topic.pros.length,
                consLength: topic.cons.length
            }
        })

        return topics
    }

    getTopicsControversial = async (limit, skip) => {

        let topics = await Topic.find({ active: true })
            .sort({ "ratioProsCons": 1, "_id": -1 })
            .skip(skip)
            .limit(limit)
            .populate({ path: 'user', model: 'User', select: 'username' })

        topics = topics.map(topic => {
            return {
                _id: topic._id,
                name: topic.name,
                username: topic.user.username,
                prosLength: topic.pros.length,
                consLength: topic.cons.length
            }
        })

        return topics
    }

    deleteTopic = async (id) => {

        const topic = await Topic.findById(id)
        if (topic) return await topic.remove()
        else throw new Error('Topic not found')
    }

    formatArgument = (argument, type) => {

        return {
            type: type,
            upvotes: argument.upvotes,
            downvotes: argument.downvotes,
            user: argument.user,
            topic: argument.topic,
            _id: argument._id,
            message: argument.message
        }
    }


    mergeArguments = (topic) => {

        let merged = []

        let prosIndex = 0
        let consIndex = 0

        for (let i = 0; i < (topic.cons.length + topic.pros.length); i++) {

            let pro = topic.pros[prosIndex]
            let con = topic.cons[consIndex]

            if (!pro) {
                merged.push(this.formatArgument(con, "con"))
                consIndex++
            }
            else if (!con) {
                merged.push(this.formatArgument(pro, "pro"))
                prosIndex++
            }
            else {

                let proSum = pro.upvotes - pro.downvotes
                let conSum = con.upvotes - con.downvotes

                if (proSum >= conSum) {
                    merged.push(this.formatArgument(pro, "pro"))
                    prosIndex++
                }
                else {
                    merged.push(this.formatArgument(con, "con"))
                    consIndex++
                }
            }
        }

        return {
            args: merged,
            pros: topic.pros,
            cons: topic.cons,
            createdAt: topic.createdAt,
            user: topic.user,
            description: topic.description,
            name: topic.name,
            _id: topic._id
        }
    }

    getTopicById = async (id) => {

        const topic = await Topic.findById(id)
            .populate({
                path: 'cons',
                populate: { path: 'user', model: 'User', select: 'username' },
                match: { active: true },
                options: { sort: { totalPositiveNumber: -1 }, limit: 100 }
            })
            .populate({
                path: 'pros',
                populate: { path: 'user', model: 'User', select: 'username' },
                match: { active: true },
                options: { sort: { totalPositiveNumber: -1 }, limit: 100 }
            })
            .populate({ path: 'user', model: 'User', select: 'username' })

        return this.mergeArguments(topic)
    }

    getTopicByIdNew = async (id) => {

        const topic = await Topic.findById(id)
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

        return this.mergeArguments(topic)
    }

    getTopicByIdControversial = async (id) => {

        const topic = await Topic.findById(id)
            .populate({
                path: 'cons',
                populate: { path: 'user', model: 'User', select: 'username' },
                match: { active: true },
                options: { sort: { totalPositiveNumber: 1 }, limit: 100 }
            })
            .populate({
                path: 'pros',
                populate: { path: 'user', model: 'User', select: 'username' },
                match: { active: true },
                options: { sort: { totalPositiveNumber: 1 }, limit: 100 }
            })
            .populate({ path: 'user', model: 'User', select: 'username' })


        return this.mergeArguments(topic)
    }

    updateTopic = async (id, name, description, resources) => {

        const topic = await Topic.findById({ id })

        if (topic) {
            topic.name = name || topic.name
            topic.description = description || topic.description
            topic.resources = resources || topic.resources
            return await topic.save()
        }
        else throw new Error('Topic not found');
    }
}

export default new TopicService



