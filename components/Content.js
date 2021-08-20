import React from 'react'
import styles from "../styles/Content.module.css"

const Content = ({ }) => {

    return (
        <div className={styles["container-search"]} >   
            <div className={styles["logo-container"]}>
                <h1> Toprocon </h1>
                <p> 
                    Read up on the pros and cons of every imaginable topic. Add your own
                    topic or add an argument to an existing topic. 
                </p>
            </div>
        </div>
    )
}

export default Content