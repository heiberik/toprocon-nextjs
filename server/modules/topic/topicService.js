import Topic from './topicModel.js'


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
                .sort({ "totalProsCons": -1 })
                .limit(100)
                .populate({ path: 'user', model: 'User', select: 'username' })

            let descSearchTopics = await Topic.find({ description: { $regex: search, $options: "i" }, active: true })
                .sort({ "totalProsCons": -1 })
                .limit(100)
                .populate({ path: 'user', model: 'User', select: 'username' })


            topics = topics.concat(descSearchTopics)

            topics = topics.filter((thing, index, self) =>
                index === self.findIndex((t) => (
                    t.place === thing.place && t.name === thing.name
                ))
            );
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
                numPros: topic.numPros,
                numCons: topic.numCons
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
                numPros: topic.numPros,
                numCons: topic.numCons
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
                numPros: topic.numPros,
                numCons: topic.numCons
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
            type: argument.type,
            upvotes: argument.upvotes,
            downvotes: argument.downvotes,
            user: argument.user,
            topic: argument.topic,
            _id: argument._id,
            message: argument.message
        }
    }


    filterTopic = (topic) => {
        return {
            args: topic.arguments,
            numPros: topic.numPros,
            numCons: topic.numCons,
            createdAt: topic.createdAt,
            user: topic.user,
            description: topic.description,
            name: topic.name,
            _id: topic._id
        }
    }

    getRandomTopicId = async () => {

        let count = await Topic.countDocuments()
        let random = Math.floor(Math.random() * count)
        let topic = await Topic.findOne({ active: true }).skip(random)
        return topic._id
    }


    getHotTopicId = async () => {

        let count = await Topic.countDocuments()
        let random = Math.floor(Math.random() * count)
        let topic = await Topic.findOne({ active: true }).skip(random)

        console.log(topic);

        return topic._id
    }


    getTopicById = async (id) => {

        const topic = await Topic.findById(id)
            .populate({
                path: 'arguments',
                populate: { path: 'user', model: 'User', select: 'username' },
                match: { active: true },
                options: { sort: { totalPositiveNumber: -1 }, limit: 1000 }
            })
            .populate({ path: 'user', model: 'User', select: 'username' })

        return this.filterTopic(topic)
    }

    getTopicByIdNew = async (id) => {

        const topic = await Topic.findById(id)
            .populate({
                path: 'arguments',
                populate: { path: 'user', model: 'User', select: 'username' },
                match: { active: true },
                options: { sort: { _id: -1 }, limit: 1000 }
            })
            .populate({ path: 'user', model: 'User', select: 'username' })

        return this.filterTopic(topic)
    }

    getTopicByIdControversial = async (id) => {

        const topic = await Topic.findById(id)
            .populate({
                path: 'arguments',
                populate: { path: 'user', model: 'User', select: 'username' },
                match: { active: true },
                options: { sort: { ratioUpvotesDownvotes: 1 }, limit: 100 }
            })
            .populate({ path: 'user', model: 'User', select: 'username' })


        return this.filterTopic(topic)
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



