import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { logoutUser } from "../services/userService"
import styles from "../styles/ProfileButton.module.css"
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import UserContext from '../context/user'


const ProfileButton = ({ toggleDropdown }) => {

    const [showDropdown, setShowDropdown] = useState(false)
    const [user, setUser] = useContext(UserContext);
    const router = useRouter()

    const handleLogout = () => {
        if (toggleDropdown) toggleDropdown()
        logoutUser()
            .then(res => {
                router.push("/")
                setUser(null)
            })
            .catch(e => {
                console.log(e);
            })
    }

    return (
        <div className={styles["settings"] + " " + "button-primary"} onMouseEnter={() => setShowDropdown(true)} onClick={() => setShowDropdown(s => !s)} onMouseLeave={() => setShowDropdown(false)}>

            <FontAwesomeIcon icon={faUser} size="1x" color="white" />
            <p className={styles["settings-username"]}> {user.username} </p>

            {showDropdown && <div className={styles["dummy-path"]}> </div>}
            {showDropdown &&
                <div className={styles["container-dropdown"]}>

                    <div className={styles["dropdown-section-horizontal"]}>
                        <div className={styles["icon-style"]}> {user.username.charAt(0)} </div>
                        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                            <p className={styles["username-style"]}> {user.username} </p>
                            <p className={styles["email-style"]}> {user.email} </p>
                        </div>
                    </div>

                    <div className={styles["dropdown-section"]}>
                        <Link href={`/profile/${user.username}`} className={styles["text-style"]}> My profile </Link>
                        {false && <Link href={`/leaderboards`} className={styles["text-style"]}> Leaderboards </Link>}
                        {false && <Link href={`/about`} className={styles["text-style"]}> About </Link>}
                    </div>

                    <div className={styles["dropdown-section"]}>
                        <button className="button-secondary" onClick={handleLogout}> Logout </button>
                    </div>

                </div>}
        </div>
    )
}

export default ProfileButton