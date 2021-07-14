import React, { useEffect, useState } from 'react'
import AddArgument from '../../components/AddArgument'
import Argument from '../../components/Argument'
import Head from 'next/head'
import TopicBar from '../../components/TopicBar'
import { PieChart } from 'react-minimal-pie-chart'
import ReportButton from '../../components/ReportButton'
import { useRouter } from 'next/router'
import TopicService from "../../server/modules/topic/topicService"
import styles from "../../styles/TopicPage.module.css"


const TopicPage = ({ user, idSet, topicServer }) => {

    const [topic, setTopic] = useState(topicServer)
    const [addingPro, setAddingPro] = useState(false)
    const [addingCon, setAddingCon] = useState(false)
    const router = useRouter()


    const usernameClicked = () => {
        router.push("/profile/" + topic.user.username)
    }

    if (!topic) return null
    else return (
        <div className="container-normal">

            <Head>
                <title> Toprocon | {topic.name} </title>
                <description> Pros and Cons of {topic.name}. </description>
            </Head>

            <div className={styles["container-desc"]}>
                <div className={styles["topic-name-container"]}>
                    <h1 className={styles["topic-name"]}> {topic.name} </h1>
                    <ReportButton
                        type="topic"
                        reportedId={topic._id}
                    />
                </div>
                <p className={styles["topic-desc"]}> {topic.description} </p>
                {/*<Resources topic={topic} /> */}
                <div className={styles["container-pie-chart"]}>
                    <PieChart
                        reveal
                        startAngle={70}
                        data={[
                            { title: 'Pros', value: topic.pros.length || 1, color: 'var(--upvote-color)' },
                            { title: 'Cons', value: topic.cons.length || 1, color: 'var(--downvote-color)' }
                        ]}
                    />
                </div>
                <p className={styles["topic-time"]}> Created at <span> {topic.createdAt.substring(8, 10)}-{topic.createdAt.substring(5, 7)}/{topic.createdAt.substring(2, 4)} - {topic.createdAt.substring(11, 16)} </span></p>
                <p className={styles["topic-user"]}> Created by <span onClick={usernameClicked}> {topic.user.username} </span> </p>
            </div>


            <TopicBar setAddingPro={setAddingPro} idSet={idSet} setAddingCon={setAddingCon} setTopic={setTopic} topic={topic} user={user} />


            <div className={styles["container-arguments"]}>

                <div className={styles["container-part-arguments"]}>
                    <div className={styles["container-args"]}>
                        {addingPro && <AddArgument user={user} topic={topic} setTopic={setTopic} setAdding={setAddingPro} type="pros" />}
                        {topic.pros.map(pro => {
                            return <Argument type={"pro"} key={pro._id} user={user} setTopic={setTopic} argument={pro} />
                        })}
                    </div>
                </div>

                <div className={styles["container-part-arguments"]}>
                    <div className={styles["container-args"]}>
                        {addingCon && <AddArgument user={user} topic={topic} setTopic={setTopic} setAdding={setAddingCon} type="cons" />}
                        {topic.cons.map(con => {
                            return <Argument type={"con"} key={con._id} user={user} setTopic={setTopic} argument={con} />
                        })}
                    </div>
                </div>

            </div>
        </div>
    )
}

export async function getServerSideProps(context) {

    const { id } = context.query

    let topic = await TopicService.getTopicById(id)
    topic = JSON.parse(JSON.stringify(topic))

    return {
        props: {
            topicServer: topic
        }
    }
}

export default TopicPage



