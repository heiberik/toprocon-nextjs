import React from 'react'
import styles from "../styles/Banner.module.css"


const Banner = () => {

    return (
        <div className={styles["container-banner"]} >   
            <div className={styles["container-text"]}>
                <h1> Toprocon </h1>
                <p> 
                    Read up on the pros and cons of every imaginable topic. Add your own
                    topic or add an argument to an existing topic. 
                </p>
            </div>
        </div>
    )
}

export default Banner