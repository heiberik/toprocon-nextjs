import React from 'react'
import styles from "../styles/Banner.module.css"


const Banner = ({header, text, colorizedHeader}) => {

    return (
        <div className={styles["container-banner"]} >   
            <div className={styles["container-text"]}>
                <h1 className={colorizedHeader ? styles["header-colorized"] : ""}> {header} </h1>
                <p> {text} </p>
            </div>
        </div>
    )
}

export default Banner