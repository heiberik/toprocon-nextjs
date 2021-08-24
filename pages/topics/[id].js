import React, { useEffect, useState } from 'react'
import AddArgument from '../../components/AddArgument'
import Argument from '../../components/Argument'
import TopicBar from '../../components/TopicBar'
import { PieChart } from 'react-minimal-pie-chart'
import ReportButton from '../../components/ReportButton'
import { useRouter } from 'next/router'
import TopicService from "../../server/modules/topic/topicService"
import styles from "../../styles/TopicPage.module.css"
import Meta from "../../components/Meta"

const TopicPage = ({ user, topicSet, topicServer }) => {

    const [topic, setTopic] = useState(topicServer)
    const [adding, setAdding] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (topicSet) {
            setTopic(topicSet)
        }
    }, [topicSet])


    const usernameClicked = () => {
        router.push("/profile/" + topic.user.username)
    }

    if (!topic) return null
    else return (
        <div className="container-normal">

            <Meta
                desc={"Top pros and cons of " + topic.name + ". " + topic.description}
                title={"Pros and cons of " + topic.name} />

            <div className={styles["container-desc"]}>
                <ReportButton
                    type="topic"
                    reportedId={topic._id}
                />
                <div className={styles["topic-name-container"]}>
                    <h1 className={styles["topic-name"]}> {topic.name} </h1>

                </div>
                <p className={styles["topic-desc"]}> {topic.description} </p>
                <div className={styles["container-pie-chart"]}>
                    <PieChart
                        reveal
                        startAngle={70}
                        data={[
                            { title: 'Pros', value: topic.numPros || 1, color: 'var(--upvote-color)' },
                            { title: 'Cons', value: topic.numCons || 1, color: 'var(--downvote-color)' }
                        ]}
                    />
                </div>
                <p className={styles["topic-user"]}> Topic created by <span onClick={usernameClicked}> {topic.user.username} </span> </p>
            </div>


            <TopicBar adding={adding} topicSet={topicSet} setAdding={setAdding} setTopic={setTopic} topic={topic} user={user} />


            <div className={styles["container-arguments"]}>
                {adding && <AddArgument user={user} topic={topic} setTopic={setTopic} setAdding={setAdding} />}
                {topic.args && topic.args.map(arg => {
                    return <Argument type={arg.type} key={arg._id} user={user} setTopic={setTopic} argument={arg} />
                })}
                {topic.args.length === 0 && !adding && <p>No arguments added to this topic yet. You could be the first!</p>}
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {

    const { id } = context.query

    try {
        let topic = await TopicService.getTopicById(id)
        topic = JSON.parse(JSON.stringify(topic))
        return {
            props: {
                topicServer: topic
            }
        }
    }
    catch (e) {
        return {
            notFound: true
        };
    }
}

export default TopicPage



