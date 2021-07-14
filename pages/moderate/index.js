import React, { useEffect, useState } from 'react'
import AuthProtect from '../../hoc/AuthProtect'
import { decreaseReport, getReport, increaseReport } from '../../services/reportService'
import TopicPage from './TopicPage'
import { Ouroboro } from 'react-spinners-css';
import Argument from '../../components/Argument'
import { getArgument } from '../../services/argumentService'
import "../../styles/Mod.module.css"


const ModPage = ({ user }) => {

    const [report, setReport] = useState(null)
    const [topicId, setTopicId] = useState(null)
    const [argumentId, setArgumentId] = useState(null)
    const [argument, setArgument] = useState(null)

    const [fetching, setFetching] = useState(false)
    const [message, setMessage] = useState(null)

    const fetchReport = () => {

        if (fetching || message) return

        setFetching(true)
        getReport()
            .then(res => {
                setFetching(false)
                setReport(res.data)
            })
            .catch(error => {
                setMessage("Nothing more to moderate.")
                setFetching(false)
            })
    }

    useEffect(() => {

        if (report || fetching || message) return
        fetchReport();

    }, [fetchReport, report, fetching, message])

    useEffect(() => {
        if (argumentId) {
            getArgument(argumentId)
                .then(res => {
                    console.log(res);
                    setArgument(res.data)
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }, [argumentId])

    useEffect(() => {

        if (report?.type === "topic") {
            setArgumentId(null)
            setTopicId(report.reportedId)
        }

        if (report?.type === "argument") {
            setTopicId(null)
            setArgumentId(report.reportedId)
        }
    }, [report])

    const yesClick = () => {

        if (fetching || message) return

        setFetching(true)
        setArgument(null)
        setArgumentId(null)
        setTopicId(null)
        setReport(null)

        increaseReport(report._id)
            .then(res => {
                setTimeout(() => {
                    fetchReport()
                }, 1000)
            })
            .catch(error => {
                setTimeout(() => {
                    fetchReport()
                }, 1000)
                console.log(error.message);
            })
    }

    const noClick = () => {

        if (fetching || message) return

        setFetching(true)
        setArgument(null)
        setArgumentId(null)
        setTopicId(null)
        setReport(null)

        decreaseReport(report._id)
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

                    <div className="container-mod">
                        <div className="mod-overlay"></div>
                        {topicId && <TopicPage user={user} idSet={topicId} />}
                        <div style={{ maxWidth: "500px", margin: "auto", marginTop: "20vh" }}>
                            {argumentId && argument && <Argument argument={argument} />}
                        </div>
                    </div>
                    <div className="mod-chooser">
                        <button className="button-primary mod-yes" onClick={yesClick}> Yes </button>
                        <p className="mod-text"> Should this item be deleted / moderated?</p>
                        <button className="button-primary mod-no" onClick={noClick}> No </button>
                    </div>
                </>
            }

            {message && <div className="mod-fetching">
                <h1 style={{ color: "var(--text-2-color)" }}> {message} </h1>
            </div>}

            {fetching && <div className="mod-fetching">
                <Ouroboro color="var(--primary-1-color)" size={200} />
            </div>}

        </>
    )
}

export default AuthProtect(ModPage)