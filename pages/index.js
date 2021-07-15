import Searchbar from '../components/Searchbar'
import Topic from '../components/Topic'
import { useState } from 'react'
import useragent from 'useragent'
import TopicService from '../server/modules/topic/topicService'

const TopicsPage = ({ topicsServer }) => {

    const [topics, setTopics] = useState(topicsServer)

    return (
        <div className="container-normal">
            <Searchbar topics={topics} setTopics={setTopics} />
            <div className="container-topics">
                {topics && topics.map(topic => <Topic key={topic._id} topic={topic} />)}
            </div>
        </div>
    )
}

export default TopicsPage

export async function getServerSideProps(context) {

    let agent = useragent.parse(context.req.headers['user-agent']);
    let topics = []

    if (agent.device.toJSON().family === 'Spider'){
        topics = await TopicService.getTopics(1000000000000, 0, "")
    }
    else {
        topics = await TopicService.getTopics(40, 0, "")
    }

    return {
        props: {
            topicsServer: topics,
        }
    }
}

