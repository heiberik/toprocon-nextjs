import { useEffect, useState } from 'react'
import ProfileButton from './ProfileButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import styles from "./Header.module.css"
import Link from "next/link"
import icon from "../public/icon.png"
import Image from 'next/image'
import { useRouter } from 'next/router'



const Header = ({ user, setUser }) => {

    const [showDropdown, setShowDropdown] = useState(false)
    const [path, setPath] = useState("")
    const router = useRouter()


    useEffect(() => {

        /*
        setPath(window.location.pathname)
        return history.listen((location) => {
            setPath(location.pathname)
        })
        */

    }, [])

    const handleFrontPage = () => {
        setShowDropdown(false)
    }

    const handleLogin = () => {
        setShowDropdown(false)
        router.push("/login")
    }

    const handleRegister = () => {
        setShowDropdown(false)
    }

    const toggleDropdown = () => {
        setShowDropdown(s => !s)
    }

    return (
        <div className={styles["container-header"]}>
            <div className={styles["wrapper-header"]}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Image src={icon} alt="icon" />
                    <h1 onClick={handleFrontPage} className={styles["header-name"]}> Toprocon </h1>
                    <Link href={`/`} className={styles["header-link"]}> Topics </Link>
                    <Link href={`/leaderboards`} className={styles["header-link"]}> Leaderboards </Link>
                    <Link href={`/moderate`} className={styles["header-link"]}> Moderate </Link>
                </div>
                {user && <div className={styles["container-buttons"]}>
                    <ProfileButton user={user} setUser={setUser} smallScreen={false} />
                </div>}
                {!user && <div className={styles["container-buttons"]}>
                    <button onClick={handleLogin} className={styles["header-button-first"]}> Login </button>
                    <button onClick={handleRegister} className={styles["button-primary"] + " " + styles["button-register"]}> Register </button>
                </div>}
            </div>
        </div>
    )


    /*
    else {
        return (
            <div className="container-header">
                <div className="wrapper-header">
                    <div style={{display: "flex", alignItems: "center"}}>
                        <img src={icon} alt="icon"/>
                        <h1 onClick={handleFrontPage} className="header-name"> Toprocon </h1>
                    </div>

                    <FontAwesomeIcon icon={faBars} size="2x" onClick={toggleDropdown} />
                </div>
                {showDropdown && <div className="container-dropdown-navbar">
                    <Link to={`/`} onClick={toggleDropdown} className="header-link"> Topics </Link>
                    <Link to={`/leaderboards`} onClick={toggleDropdown} className="header-link"> Leaderboards </Link>
                    <Link to={`/moderate`} onClick={toggleDropdown} className="header-link"> Moderate </Link>
                    {user && <div className="container-buttons">
                        <ProfileButton user={user} setUser={setUser} smallScreen={true} toggleDropdown={toggleDropdown} />
                    </div>}
                    {!user && <div className="container-buttons">
                        <button onClick={handleLogin} className="header-button-first"> Login </button>
                        <button onClick={handleRegister} className="button-primary button-register"> Register </button>
                    </div>}
                </div>}
            </div>
        )
    }
    */
}

export default Header