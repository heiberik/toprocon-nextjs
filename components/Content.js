import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import styles from "../styles/Content.module.css"
import { getHotTopicId, getRandomTopicId, searchTopic } from '../services/topicService'
import { useRouter } from 'next/router'



const Content = ({ setSortBy, setPageSearch, limit, searchText, setSearchText, setTopicsSearch, setTopics,}) => {

    const router = useRouter()

    const inputChangeHandler = (e) => {
        setSearchText(e.target.value)
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


    const hotTopicClick = () => {
        getHotTopicId()
            .then(res => {
                router.push(`/topics/${res.data}`)
            })
            .catch(e => {
                console.log(e);
            })
    }

    return (

        <div>   

            <div className={styles["logo-container"]}>
                <h1> Toprocon </h1>
            </div>

            <div className={styles["search-container"]} >

                <form onSubmit={searchForTopic} className={styles["form-search"]}>
                    <input value={searchText} id="input-search" autoComplete="off" data-lpignore="true" onChange={inputChangeHandler} placeholder="" className={styles["input-search"]} />
                    <button type="submit" className={styles["submit-search"]}> <FontAwesomeIcon icon={faSearch} size="2x" /> </button>
                </form>

                {false &&
                    <div className={styles["button-container"]}>
                        <button className={styles["button-search-big"]} onClick={randomTopicClick}> Random Topic </button>
                    </div>}
            </div>
        </div>


    )


}

export default Content