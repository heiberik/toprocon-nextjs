import Head from 'next/head'
import Searchbar from '../components/Searchbar'
import Topic from '../components/Topic'
import { useState } from 'react'
import TopicService from '../server/modules/topic/topicService'


const TopicsPage = ({ topicsServer }) => {

    const [topics, setTopics] = useState(topicsServer)

    return (
        <div className="container-normal">

            <Head>
                <html lang="en" />
                <title> Toprocon </title>
                <description> Pros and Cons of every imaginable user generated topic. Start a new discussion by adding a topic. Add your opinions to other user generated topics. Earn points. Help moderating.</description>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <Searchbar topics={topics} setTopics={setTopics} />
            <div className="container-topics">
                {topics && topics.map(topic => <Topic key={topic._id} topic={topic} />)}
            </div>
        </div>
    )
}

export default TopicsPage

export async function getServerSideProps(context) {

    const topics = await TopicService.getTopics(40, 0, "")

    return {
        props: {
            topicsServer: topics,
        }
    }
}

