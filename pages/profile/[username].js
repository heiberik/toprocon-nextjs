import React, { useEffect, useState } from 'react'
import Argument from '../../components/Argument'
import { getPublicUserInfo, banUser } from '../../services/userService'
import { useRouter } from 'next/router'
import styles from "../../styles/Profile.module.css"

const ProfilePage = ({ user }) => {

    let username = "hehe"
    const [userInfo, setUserInfo] = useState(null)
    const [error, setError] = useState(null)
    const router = useRouter()
    

    useEffect(() => {

        /*
        if (!userInfo) {
            getPublicUserInfo(username)
                .then(res => {
                    setUserInfo(res.data)
                })
                .catch(error => {
                    setError(error.response.data)
                })
        }
        */
    }, [])

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

    if (!userInfo) return (
        <div className="container-normal">
            <div className="userInfo-meta">
                <h1 className="userInfo-username"> {username} </h1>
            </div>
            {error && <p className="text-error"> {error} </p>}
        </div>
    )
    else return (
        <div className="container-normal">
            <div className="userInfo-meta">
                <h1 className="userInfo-username"> {username} </h1>
            </div>

            {user && user.isAdmin &&
                <button onClick={banThisUser} className="button-primary ban-button"> {userInfo.banned ? "Unban user" : "Ban user"} </button>}

            <h2 className="userInfo-header"> Top arguments </h2>
            <div className="container-best-arguments">
                {userInfo.bestArguments.length === 0 && <p className="infoNumber"> {username} has not added any arguments</p>}
                    {userInfo.bestArguments.map(arg => {
                        return <div onClick={() => goToTopic(arg.topic)} key={arg._id}>
                            <Argument type={"pro"} user={username} setTopic={null} argument={arg} />
                        </div>
                    })}
            </div>


            <h2 className="userInfo-header"> User statistics </h2>
            <div className="container-userInfo">
                <div className="box">
                    <p className="infoText"> Upvotes given : </p>
                    <p className="infoText"> Upvotes received : </p>
                    <br></br>
                    <p className="infoText"> Downvotes given : </p>
                    <p className="infoText"> Downvotes received : </p>
                    <br></br>
                    <p className="infoText"> Arguments added : </p>
                </div>
                <div className="box">
                    <p className="infoNumber"> {userInfo.totalUpvotes}  </p>
                    <p className="infoNumber"> {userInfo.receivedUpvotes}  </p>
                    <br></br>
                    <p className="infoNumber"> {userInfo.totalDownvotes} </p>
                    <p className="infoNumber"> {userInfo.receivedDownvotes}  </p>
                    <br></br>
                    <p className="infoNumber"> {userInfo.totalArgumentsAdded}  </p>
                </div>
            </div>



            <h2 className="userInfo-header"> Created topics </h2>
            <div className="container-topics-added">
                {userInfo.addedTopics.length === 0 && <p className="infoNumber"> {username} has not added any topics</p>}
                {userInfo.addedTopics.map(topic => {
                    return <p key={topic.id} onClick={() => goToTopic(topic.id)} className="topic-topic"> {topic.name} </p>
                })}
            </div>


        </div>
    )
}

export default ProfilePage