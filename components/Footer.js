import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { faGithub } from "@fortawesome/free-brands-svg-icons"

import styles from "../styles/Footer.module.css"


const Footer = () => {

    return (
        <div className={styles["container-footer"]}>


            <div className={styles["footer"]}>
                <div className={styles["footer-part"]}>
                    <p> Toprocon</p>
                    <p> admin@toprocon.com</p>
                    <p> by Henrik Heiberg</p>
                    <div>
                        <a href="https://github.com/heiberik" target="_blank" rel="noopener noreferrer" aria-label="Github"> <FontAwesomeIcon icon={faGithub} size="2x" color="white" /> </a>
                        <a href="https://www.linkedin.com/in/heiberik/" target="_blank" rel="noopener noreferrer" aria-label="Linkedin"> <FontAwesomeIcon icon={faLinkedin} size="2x" color="white" /> </a>
                        
                    </div>
                </div>
                <div className={styles["footer-part"]}>

                </div>
            </div>

        </div>
    )
}

export default Footer