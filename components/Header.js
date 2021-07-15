import { createRef, useEffect, useRef } from 'react'
import ProfileButton from './ProfileButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import styles from "../styles/Header.module.css"
import Link from "next/link"
import icon from "../public/icon.png"
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import UserContext from '../context/user'
import { getUser } from "../services/userService"

const Header = ({ }) => {

    const [user, setUser] = useContext(UserContext);
    const router = useRouter()


    useEffect(() => {
        getUser()
            .then(res => {
                setUser(JSON.parse(res.data))
            })
            .catch(error => {
                console.log(error);
            })
    }, [setUser])


    const handleFrontPage = () => {
        toggleDropdown(false)
        router.push("/")
    }

    const handleLogin = () => {
        toggleDropdown(false)
        router.push("/login")
    }

    const handleRegister = () => {
        toggleDropdown(false)
        router.push("/register")
    }

    const toggleDropdown = (e) => {


        let menu = document.getElementById("dropdown")
        
        if (menu.style.visibility !== "visible"){
            menu.style.opacity = 1
            menu.style.visibility = "visible"
        }
        else {
            menu.style.opacity = 0
            menu.style.visibility = "hidden"
        }
    }

    return (
        <div className={styles["container-header"]}>
            <div className={styles["wrapper-header"]}>

                <div className={styles["icon-container"]}>
                    <Image src={icon} alt="icon" />
                    <h1 onClick={handleFrontPage} className={styles["header-name"]}> Toprocon </h1>
                </div>

                <div className={styles["hamburger"]} onClick={(e) => toggleDropdown(e)}>
                    <FontAwesomeIcon icon={faBars} size="2x" color="white" />
                </div>

                <div className={styles["header-items"]} id="dropdown">

                    <Link href={`/`} className={styles["header-link"]}> Topics </Link>
                    <Link href={`/leaderboards`} className={styles["header-link"]}> Leaderboards </Link>
                    <Link href={`/moderate`} className={styles["header-link"]}> Moderate </Link>

                    {user && <div className={styles["container-buttons"]}>
                        <ProfileButton user={user} setUser={setUser} />
                    </div>}

                    {!user && <div className={styles["container-buttons"]}>
                        <button onClick={handleLogin} className={styles["header-button-first"]}> Login </button>
                        <button onClick={handleRegister} className={styles["button-primary"] + " " + styles["button-register"]}> Register </button>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Header
