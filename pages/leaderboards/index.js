import React, { useEffect, useState } from 'react'
import { getLeaderboard } from '../../services/leaderboardService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faBaby } from '@fortawesome/free-solid-svg-icons'
import { faBomb } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import SortBy from '../../components/SortBy'
import LeaderboardService from "../../server/modules/leaderboard/boardService"
import styles from "../../styles/Leaderboard.module.css"
import styles2 from "../../styles/Searchbar.module.css"


const Leaderboard = ({ leaderboardServer }) => {

    const [leaderboard, setLeaderboard] = useState(leaderboardServer)
    const [sortBy, setSortBy] = useState("total")

    const router = useRouter()

    const sortClick = (type) => {
        setSortBy(type)
    }

    const usernameClick = (username) => {
        router.push("/profile/" + username)
    }

    return (
        <div className="container-normal">

            <div className={styles2["container-searchbar"] + " " + styles["searchbar-leaderboard"]} >
                <div className={styles["container-part"]} style={{ position: "relative", justifyContent: "flex-end", display: "flex", width: "100%", marginRight: "0px" }}>
                    <SortBy sortClick={sortClick} sortBy={sortBy} leaderboard={true} />
                </div>
            </div>

            <div className={styles["container-leaderboard"]}>
                {leaderboard.map(user => {
                    return <div className={styles["leaderboard-user-card"]} key={user.username}>
                        <p onClick={() => usernameClick(user.username)}> {user.username} </p>
                        <p> {user.points} </p>
                    </div>
                })}
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {

    let leaderboard = await LeaderboardService.getLeaderboardTotal()
    leaderboard = JSON.parse(JSON.stringify(leaderboard))

    return {
        props: {
            leaderboardServer: leaderboard
        }
    }
}

export default Leaderboard