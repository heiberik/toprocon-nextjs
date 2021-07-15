import React, { useEffect, useState } from 'react'
import { getTopics, searchTopic } from '../services/topicService'
import { useBottomScrollListener } from 'react-bottom-scroll-listener'
import { useRouter } from 'next/router'
import AddButton from './AddButton'
import Search from './Search'
import SortBy from './SortBy'
import styles from "../styles/Searchbar.module.css"

const Searchbar = ({ topics, setTopics }) => {

    let limit = 40

    const [sortBy, setSortBy] = useState("top")
    const [searchText, setSearchText] = useState("")

    const [topicsTop, setTopicsTop] = useState(topics)
    const [topicsNew, setTopicsNew] = useState(null)
    const [topicsControversial, setTopicsControversial] = useState(null)
    const [topicsSearch, setTopicsSearch] = useState(null)

    const [pageTop, setPageTop] = useState(limit)
    const [pageNew, setPageNew] = useState(limit)
    const [pageControversial, setPageControversial] = useState(limit)
    const [pageSearch, setPageSearch] = useState(limit)
    const router = useRouter()


    useBottomScrollListener(() => {

        if (!topics) return

        if (sortBy === "top" && topicsTop) {
            getTopics(sortBy, pageTop, limit)
                .then(res => {
                    setPageTop(pageTop + limit)
                    setTopicsTop(topicsTop.concat(res.data))
                    setTopics(topicsTop)
                })
                .catch(error => {
                    console.log(error);
                })
        }
        if (sortBy === "new" && topicsNew) {
            getTopics(sortBy, pageNew, limit)
                .then(res => {
                    setPageNew(pageNew + limit)
                    setTopicsNew(topicsNew.concat(res.data))
                    setTopics(topicsNew)
                })
                .catch(error => {
                    console.log(error);
                })
        }
        if (sortBy === "controversial" && topicsControversial) {
            getTopics(sortBy, pageControversial, limit)
                .then(res => {
                    setPageControversial(pageControversial + limit)
                    setTopicsControversial(topicsControversial.concat(res.data))
                    setTopics(topicsControversial)
                })
                .catch(error => {
                    console.log(error);
                })
        }
        if (sortBy === "" && topicsSearch) {
            searchTopic(searchText, pageSearch, limit)
                .then(res => {
                    setPageSearch(pageSearch + limit)
                    setTopicsSearch(topicsSearch.concat(res.data))
                    setTopics(topicsSearch)
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }, { offset: 800 });


    useEffect(() => {

        if (sortBy === "") return
        if (sortBy === "top" && topicsTop) setTopics(topicsTop)
        else if (sortBy === "new" && topicsNew) setTopics(topicsNew)
        else if (sortBy === "controversial" && topicsControversial) setTopics(topicsControversial)
        else {
            getTopics(sortBy, 0, limit)
                .then(res => {

                    if (sortBy === "top") setTopicsTop(res.data)
                    if (sortBy === "new") setTopicsNew(res.data)
                    if (sortBy === "controversial") setTopicsControversial(res.data)

                    setTopics(res.data)
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }, [sortBy, setTopics, topicsTop, topicsNew, topicsControversial, limit])

    const sortClick = (sortBy) => {
        setSortBy(sortBy)
    }

    const textChangeHandler = (e) => {
        setSearchText(e.target.value)
    }

    const addClick = () => {
        router.push("/topics/add")
    }

    const searchForTopic = (e) => {

        e.preventDefault()
        setSortBy("")
        setPageSearch(limit)

        searchTopic(searchText, 0, limit)
            .then(res => {
                console.log(res);
                setTopicsSearch(res.data)
                setTopics(res.data)
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className={styles['container-searchbar']} >
            <div className={styles["container-part"]} style={{ width: "100%" }}>
                <AddButton
                    clickHandler={addClick}
                    text="Add topic" />
                <Search
                    submitHandler={searchForTopic}
                    inputChangeHandler={textChangeHandler}
                    searchText={searchText}
                />
            </div>

            <div className={styles["container-part"]} style={{ position: "relative", width: "fit-content" }}>
                <SortBy sortClick={sortClick} sortBy={sortBy} />
            </div>
        </div>
    )
}

export default Searchbar