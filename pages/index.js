import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Searchbar from '../components/Searchbar'
import Topic from '../components/Topic'
import { useState } from 'react'
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

export async function getServerSideProps(context){

    const topics = await TopicService.getTopics(40, 0, "")

    return {
        props: {
            topicsServer: topics,
        }
    }
}

