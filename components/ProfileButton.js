import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { logoutUser } from "../services/userService"
import styles from "../styles/ProfileButton.module.css"
import  Link  from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import UserContext from '../context/user'



const ProfileButton = ({ toggleDropdown }) => {

    const [showDropdown, setShowDropdown] = useState(false)
    const [user, setUser] = useContext(UserContext);
    const router = useRouter()

    const handleLogout = async () => {
        if (toggleDropdown) toggleDropdown()
        await logoutUser()
        setUser(null)
        router.push("/")
    }

    return (
        <div className={styles["settings"]} onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
            <FontAwesomeIcon icon={faUser} size="1x" color="white" />

            {showDropdown &&
                <div className={styles["dummy-path"]}> </div>
            }
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
                        <a href={`/profile/${user.username}`} className={styles["text-style"]}> My profile </a>
                        {false && <Link to={`/leaderboards`} className={styles["text-style"]}> Leaderboards </Link>}
                        {false && <Link to={`/about`} className={styles["text-style"]}> About </Link>}
                    </div>

                    <div className={styles["dropdown-section"]}>
                        <button className={styles["button-1"] + " " + styles["button-logout"]} onClick={handleLogout}> Logout </button>
                    </div>

                </div>
            }
        </div>
    )
    /*
    else return (

        <div>

            <div className="dropdown-section-horizontal">
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                    <p className="username-style"> {user.username} </p>
                    <p className="email-style"> {user.email} </p>
                </div>
            </div>

            <div className="dropdown-section">
                <Link to={`/profile/${user.username}`} onClick={toggleDropdown} className="text-style"> My profile </Link>
            </div>

            <div className="dropdown-section">
                <button className="button-1 button-logout" onClick={handleLogout}> Logout </button>
            </div>

        </div>

    )
    */
}

export default ProfileButton



