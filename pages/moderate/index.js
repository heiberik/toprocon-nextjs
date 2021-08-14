import React, { useEffect, useState } from 'react'
import { decreaseReport, getReport, increaseReport } from '../../services/reportService'
import TopicPage from '../topics/[id]'
import Argument from '../../components/Argument'
import { getArgument } from '../../services/argumentService'
import styles from "../../styles/Mod.module.css"


const ModPage = ({ user }) => {

    const [report, setReport] = useState(null)
    const [argument, setArgument] = useState(null)
    const [topic, setTopic] = useState(null)

    const [fetching, setFetching] = useState(false)
    const [message, setMessage] = useState(null)

    const fetchReport = () => {

        if (fetching || message || report) return

        setFetching(true)
        getReport()
            .then(res => {
                setReport(res.data)
                console.log(res.data);
                setFetching(false)
            })
            .catch(error => {
                setMessage("Nothing more to moderate.")
                setFetching(false)
            })
    }

    useEffect(() => {
        if (report || fetching || message) return

        setFetching(true)

        setTimeout(() => {
            fetchReport()
        }, 1000)
    }, [fetchReport, report, fetching, message])


    useEffect(() => {

        if (report?.report.type === "topic") {
            setArgument(null)
            setTopic(report?.item)
        }

        if (report?.report.type === "argument") {
            setTopic(null)
            setArgument(report?.item)
        }
        
    }, [report])

    const yesClick = () => {

        if (fetching || message) return

        setArgument(null)
        setTopic(null)
        setReport(null)

        increaseReport(report.report._id)
            .then(res => {
                setTimeout(() => {
                    fetchReport()
                }, 1000)
            })
            .catch(error => {
                setTimeout(() => {
                    fetchReport()
                }, 1000)
            })
    }

    const noClick = () => {

        if (fetching || message) return

        setArgument(null)
        setTopic(null)
        setReport(null)

        decreaseReport(report.report._id)
            .then(res => {
                setTimeout(() => {
                    fetchReport()
                }, 1000)
            })
            .catch(error => {
                setTimeout(() => {
                    fetchReport()
                }, 1000)
            })
    }


    return (
        <>
            {!fetching && report &&
                <>

                    <div className={styles["container-mod"]}>
                        <div className={styles["mod-overlay"]}></div>
                        {topic && <TopicPage user={user} topicSet={topic} />}
                        <div style={{ maxWidth: "800px", margin: "auto", marginTop: "20vh" }}>
                            {argument && <Argument argument={argument} />}
                        </div>
                    </div>
                    <div className={styles["mod-chooser"]}>
                        <button className={styles["button-primary"] + " " + styles["mod-yes"]} onClick={yesClick}> Yes ({report.report.agreed}) </button>
                        <p className={styles["mod-text"]}> Should this item be removed?</p>
                        <button className={styles["button-primary"] + " " + styles["mod-no"]} onClick={noClick}> No ({report.report.disagreed})</button>
                    </div>
                </>
            }

            {message && <div className={styles["mod-fetching"]}>
                <h1 className={styles["mod-text"]}> {message} </h1>
            </div>}

            {fetching && <div className={styles["mod-fetching"]}>
                <h1> FETCHING REPORT </h1>
            </div>}

        </>
    )
}

export default ModPage