import {useEffect} from 'react'
import ProfileButton from './ProfileButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import styles from "../styles/Header.module.css"
import icon from "../public/icon.png"
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import UserContext from '../context/user'
import { getUser } from "../services/userService"

const Header = ({ }) => {

    const [user, setUser] = useContext(UserContext);
    const router = useRouter()

    const toggleDropdown = (t) => {

        let menu = document.getElementById("dropdown")

        if (menu.style.visibility !== "visible" && t !== false) {
            menu.style.opacity = 1
            menu.style.visibility = "visible"
        }
        else {
            menu.style.opacity = 0
            menu.style.visibility = "hidden"
        }
    }
  
    useEffect(() => {
        toggleDropdown(false)
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

    const handleClick = (e, path) => {
        router.push(path)
        toggleDropdown(false)
    }

    const handleLogin = () => {
        toggleDropdown(false)
        router.push("/login")
    }

    const handleRegister = () => {
        toggleDropdown(false)
        router.push("/register")
    }

    

    return (
        <div className={styles["container-header"]}>
            <header className={styles["wrapper-header"]}>

                <div className={styles["icon-container"]} onClick={handleFrontPage}>
                    <Image src={icon} priority={true} alt="icon" />
                    <h1 className={styles["header-name"]}> Toprocon </h1>
                </div>

                <div className={styles["hamburger"]} onClick={(e) => toggleDropdown(e)}>
                    <FontAwesomeIcon icon={faBars} size="2x" color="white" />
                </div>

                <nav className={styles["header-items"]} id="dropdown">

                    <button onClick={(e) => handleClick(e, "/")} className={styles["header-link"]}> Topics </button>
                    <button onClick={(e) => handleClick(e, "/leaderboards")} className={styles["header-link"]}> Leaderboards </button>
                    <button onClick={(e) => handleClick(e, "/moderate")} className={styles["header-link"]}> Moderate </button>

                    {user && <div className={styles["container-buttons"]}>
                        <ProfileButton user={user} setUser={setUser} />
                    </div>}

                    {!user && <div className={styles["container-buttons"]}>
                        <button onClick={handleLogin} className="button-secondary" style={{marginRight: "10px"}}> Login </button>
                        <button onClick={handleRegister} className="button-primary"> Register </button>
                    </div>}
                </nav>
            </header>
        </div>
    )
}

export default Header
