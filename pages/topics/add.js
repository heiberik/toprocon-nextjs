import React, { useState } from 'react';
import { useRouter } from 'next/router'
import Info from '../../components/Info';
import { addTopic } from '../../services/topicService'
import styles from '../../styles/AddTopic.module.css'


const AddTopicPage = () => {

    const [showInfo, setShowInfo] = useState(true)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState(null)
    const router = useRouter()


    const onSubmitHandler = (e) => {

        e.preventDefault()
        setError(null);

        if (name.trim().length < 2) {
            setError("Topic name must be at least 2 characters")
        }
        else if (name.length > 100) {
            setError("Topic name can't be more than 100 characters")
        }
        else if (description.length < 30) {
            setError("Topic description must be at least 30 characters")
        }
        else if (description.length > 1000) {
            setError("Topic description can't be more than 2000 characters")
        }
        else {

            addTopic(name.replace(/\s+/g, ' ').trim(), description.replace(/\s+/g, ' ').trim(), [])
                .then(res => {
                    router.push("/topics/" + res.data._id)
                })
                .catch(error => {
                    if (error.response.status === 429) {
                        setError("You can only add one topic per 24 hours")
                    }
                    else setError("Error creating topic.")
                })
        }
    }

    const inputChangeHandler = (e) => {
        setError(null)
        switch (e.target.name) {
            case "name": setName(e.target.value); break;
            case "description": {
                e.target.style.height = "";
                e.target.style.height = e.target.scrollHeight + "px";
                setDescription(e.target.value);
                break;
            }
            default: break;
        }
    }

    const validURLs = urls => {
        let listUrls = urls.trim().split(",")
        listUrls = listUrls.map(url => url.replace("\n", ""))
        listUrls = listUrls.filter(url => { return url })

        if (listUrls.length < 1) return false
        let valid = true
        listUrls.forEach(url => {
            if (validURL(url) === false) valid = false
        })
        return valid
    }

    const validURL = (url) => {
        var pattern = new RegExp('^(https?:\\/\\/)?' +
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
            '((\\d{1,3}\\.){3}\\d{1,3}))' +
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
            '(\\?[;&a-z\\d%_.~+=-]*)?' +
            '(\\#[-a-z\\d_]*)?$', 'i');
        return !!pattern.test(url);
    }

    if (showInfo) {
        return (
            <div className="container-normal">
                <Info showInfo={showInfo} setShowInfo={setShowInfo} />
            </div>
        )
    }
    else return (
        <div className="container-normal">

            <div className={styles["container-new-topic"]}>

                <h1 className={styles["header-new-topic"]}> Creating a new topic </h1>

                <form onSubmit={onSubmitHandler}>

                    <div className={styles["new-topic-input"]}>
                        <input
                            placeholder="Topic name"
                            autoComplete="off"
                            onChange={inputChangeHandler}
                            name="name"
                            type="text"
                            value={name} />
                    </div>

                    <div className={styles["new-topic-input"]}>
                        <textarea
                            placeholder="Topic description"
                            autoComplete="off"
                            onChange={inputChangeHandler}
                            name="description"
                            value={description} />
                    </div>

                    {error && <p className="text-error" > {error} </p>}

                    <div>
                        <button type="submit" className="button-primary button-full-width" style={{ marginBottom: "0px", marginTop: "30px" }}> Create topic </button>
                        <Info showInfo={showInfo} setShowInfo={setShowInfo} />
                    </div>
                </form>
            </div>

        </div>
    )
}

export default AddTopicPage



