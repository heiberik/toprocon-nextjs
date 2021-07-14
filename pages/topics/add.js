import React, { useState } from 'react';
import { useRouter } from 'next/router'
import Info from '../../components/Info';
import { addTopic } from '../../services/topicService'
import styles from '../../styles/AddTopic.module.css'
import Head from 'next/head'


const AddTopicPage = () => {

    const [showInfo, setShowInfo] = useState(true)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [resources, setResources] = useState("")
    const [error, setError] = useState(null)
    const router = useRouter()


    const onSubmitHandler = (e) => {

        e.preventDefault()
        setError(null);

        if (name.length.trim() < 2) {
            setError("Name must be at least 2 characters")
        }
        else if (description.length.trim() < 6) {
            setError("Description must be at least 6 characters")
        }
        else if (!validURLs(resources)) {
            setError("You must add one or more valid resources. Separate resources by using a comma.")
        }
        else {

            let resourcesList = resources.trim().split(",")
            resourcesList = resourcesList.map(url => url.replace("\n", ""))
            resourcesList = resourcesList.filter(url => { return url })

            addTopic(name.replace(/\s+/g, ' ').trim(), description.replace(/\s+/g, ' ').trim(), resourcesList)
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
            case "description": setDescription(e.target.value); break;
            case "resources": setResources(e.target.value); break;
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
                <h1 className={styles["header-new-topic"]}> Creating a new topic </h1>
                <Info showInfo={showInfo} setShowInfo={setShowInfo} />
            </div>
        )
    }
    else return (
        <div className="container-normal">

            <Head>
                <html lang="en" />
                <title> Toprocon | New topic</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <h1 className={styles["header-new-topic"]}> Creating a new topic </h1>
            <div className={styles["container-new-topic"]}>
                <form onSubmit={onSubmitHandler}>

                    <div className={styles["new-topic-input"]}>
                        <label htmlFor="name"> Topic name</label>
                        <input
                            placeholder="'Facebook'"
                            onChange={inputChangeHandler}
                            name="name"
                            value={name} />
                    </div>

                    <div className={styles["new-topic-input"]}>
                        <label htmlFor="description"> Topic description</label>
                        <textarea
                            placeholder="'An American online social media and social networking service'"
                            onChange={inputChangeHandler}
                            name="description"
                            value={description} />
                    </div>


                    <div className={styles["new-topic-input"]}>
                        <label htmlFor="resources"> Topic resources</label>
                        <textarea

                            placeholder={
                                `https://www.facebook.com, 
https://www.en.wikipedia.org/wiki/Facebook`}
                            onChange={inputChangeHandler}
                            name="resources"
                            value={resources} />
                    </div>

                    {error && <p className="text-error" > {error} </p>}

                    <div>
                        <button type="submit" className="button-primary" style={{ marginBottom: "0px", marginRight: "20px" }}> Create topic </button>
                        <Info showInfo={showInfo} setShowInfo={setShowInfo} />
                    </div>
                </form>
            </div>

        </div>
    )
}

export default AddTopicPage



