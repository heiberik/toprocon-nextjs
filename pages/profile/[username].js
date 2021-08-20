import React, { useEffect, useState } from 'react'
import Argument from '../../components/Argument'
import { banUser } from '../../services/userService'
import { useRouter } from 'next/router'
import styles from "../../styles/Profile.module.css"
import UserContext from '../../context/user'
import { useContext } from 'react'
import UserService from "../../server/modules/user/userService"

const ProfilePage = ({ userInfoServer, username }) => {

    const [user, setUser] = useContext(UserContext);
    const [userInfo, setUserInfo] = useState(userInfoServer)
    const [error, setError] = useState(null)
    const router = useRouter()

    const goToTopic = (id) => {
        router.push("/topics/" + id)
    }

    const banThisUser = () => {
        banUser(username)
            .then(res => {
                setUserInfo(res.data)
            })
            .catch(error => {
                setError(error.response.data)
            })
    }

    return (
        <div className="container-normal">
            <div className={styles["userInfo-meta"]}>
                <h1 className={styles["userInfo-username"]}> {userInfo.username} </h1>
            </div>

            {user && user.isAdmin &&
                <button onClick={banThisUser} className={"button-primary " + styles["ban-button"]}> {userInfo.banned ? "Unban user" : "Ban user"} </button>}

            <h2 className={styles["userInfo-header"]}> Top arguments </h2>
            <div className={styles["container-best-arguments"]}>
                {userInfo.bestArguments.length === 0 && <p className={styles["infoNumber"]}> {username} has not added any arguments</p>}
                {userInfo.bestArguments.map(arg => {
                    return <div onClick={() => goToTopic(arg.topic)} key={arg._id} style={{ margin: "10px" }}>
                        <Argument type={"pro"} user={username} setTopic={null} argument={arg} />
                    </div>
                })}
            </div>


            <h2 className={styles["userInfo-header"]}> User statistics </h2>
            <div className={styles["container-userInfo"]}>
                <div className={styles["box"]}>
                    <p className={styles["infoText"]}> Upvotes given : </p>
                    <p className={styles["infoText"]}> Upvotes received : </p>
                    <br></br>
                    <p className={styles["infoText"]}> Downvotes given : </p>
                    <p className={styles["infoText"]}> Downvotes received : </p>
                    <br></br>
                    <p className={styles["infoText"]}> Arguments added : </p>
                </div>
                <div className={styles["box"]}>
                    <p className={styles["infoNumber"]}> {userInfo.totalUpvotes}  </p>
                    <p className={styles["infoNumber"]}> {userInfo.receivedUpvotes}  </p>
                    <br></br>
                    <p className={styles["infoNumber"]}> {userInfo.totalDownvotes} </p>
                    <p className={styles["infoNumber"]}> {userInfo.receivedDownvotes}  </p>
                    <br></br>
                    <p className={styles["infoNumber"]}> {userInfo.totalArgumentsAdded}  </p>
                </div>
            </div>

            <h2 className={styles["userInfo-header"]}> Created topics </h2>
            <div className={styles["container-topics-added"]}>
                {userInfo.addedTopics.length === 0 && <p className={styles["infoNumber"]}> {username} has not added any topics</p>}
                {userInfo.addedTopics.map(topic => {
                    return <p key={topic.id} onClick={() => goToTopic(topic.id)} className={styles["topic-topic"]}> {topic.name} </p>
                })}
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {

    const { username } = context.query

    try {
        let userInfo = await UserService.getPublicUserInfo(username)
        userInfo = JSON.parse(JSON.stringify(userInfo))

        return {
            props: {
                username: username,
                userInfoServer: userInfo
            }
        }
    }
    catch(e) {
        return {
            notFound: true
        };
    }
    
}


export default ProfilePage