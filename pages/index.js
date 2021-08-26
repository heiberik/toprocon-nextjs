import Searchbar from '../components/Searchbar'
import Topic from '../components/Topic'
import { useState } from 'react'
import useragent from 'useragent'
import TopicService from '../server/modules/topic/topicService'
import styles from "../styles/Topics.module.css"
import Banner from '../components/Banner'


const TopicsPage = ({ topicsServer }) => {

    const [topics, setTopics] = useState(topicsServer)

    return (
        <>
            <Banner
                header={"Toprocon"}
                text={`Read up on the pros and cons of every imaginable topic. Add your own
                topic or add an argument to an existing topic.`}
                colorizedHeader={true}
            />
            <div className="container-normal" style={{ marginTop: "22em" }}>
                <Searchbar topics={topics} setTopics={setTopics} />
                <div className={styles["container-topics"]}>
                    {topics && topics.map(topic => <Topic key={topic._id} topic={topic} />)}
                    {topics.length === 0 && <p style={{ margin: "5px", fontSize: "1.2rem" }}> No topics matching search </p>}
                </div>
            </div>
        </>
    )
}

export default TopicsPage

export async function getServerSideProps(context) {

    let agent = useragent.parse(context.req.headers['user-agent']);
    let topics = []

    if (agent.device.toJSON().family === 'Spider') {
        topics = await TopicService.getTopics(1000000000000, 0, "")
    }
    else {
        topics = await TopicService.getTopics(60, 0, "")
    }

    return {
        props: {
            topicsServer: topics,
        }
    }
}

