import React, { useEffect, useState } from 'react'
import { getRandomTopicId, getTopics, searchTopic } from '../services/topicService'
import { useBottomScrollListener } from 'react-bottom-scroll-listener'
import { useRouter } from 'next/router'
import Search from './Search'
import SortBy from './SortBy'
import styles from "../styles/Searchbar.module.css"
import { useContext } from 'react'
import UserContext from '../context/user'

const Searchbar = ({ topics, setTopics }) => {

    let limit = 60
    const [user, setUser] = useContext(UserContext);

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

        if (!topics || searchText.trim().length > 0) return

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
        setSearchText("")
        setSortBy(sortBy)
    }


    const addClick = () => {
        if (user) router.push("/topics/add")
        else router.push("/login")
    }


    const randomTopicClick = () => {
        getRandomTopicId()
            .then(res => {
                router.push(`/topics/${res.data}`)
            })
            .catch(e => {
                console.log(e);
            })
    }

    return (
            <div className={styles['container-searchbar']} >
                <div className={styles['container-part']}>
                    <button className='button-primary' onClick={addClick} style={{ marginRight: "15px" }}> Add topic </button>
                    <button className={'button-secondary' + " " + styles["button-random"]} style={{ marginRight: "15px" }} onClick={randomTopicClick}> View a random topic</button>
                    <Search
                        setSortBy={setSortBy}
                        setPageSearch={setPageSearch}
                        limit={limit}
                        searchText={searchText}
                        setSearchText={setSearchText}
                        inputChangeHandler={setSearchText}
                        setTopicsSearch={setTopicsSearch}
                        setTopics={setTopics} />
                </div>
                <div>
                    <SortBy 
                        sortClick={sortClick} 
                        sortBy={sortBy} 
                        alternatives={["top", "new", "controversial"]} />
                </div>
            </div>
    )
}

export default Searchbar