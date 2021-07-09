import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { logoutUser } from "../services/userService"
import "./ProfileButton.module.css"
import  Link  from 'next/link'


const ProfileButton = ({ user, setUser, smallScreen, toggleDropdown }) => {

    const [showDropdown, setShowDropdown] = useState(false)
    const history = useHistory()

    const handleLogout = () => {
        if (toggleDropdown) toggleDropdown()
        logoutUser()
        setUser(null)
        history.go(0)
    }

    if (!smallScreen) return (
        <div className="settings" onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
            <FontAwesomeIcon icon={faUser} size="1x" color="white" />

            {showDropdown &&
                <div className="dummy-path"> </div>
            }
            {showDropdown &&
                <div className="container-dropdown">

                    <div className="dropdown-section-horizontal">
                        <div className="icon-style"> {user.username.charAt(0)} </div>
                        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                            <p className="username-style"> {user.username} </p>
                            <p className="email-style"> {user.email} </p>
                        </div>
                    </div>

                    <div className="dropdown-section">
                        <a href={`/profile/${user.username}`} className="text-style"> My profile </a>
                        {false && <Link to={`/leaderboards`} className="text-style"> Leaderboards </Link>}
                        {false && <Link to={`/about`} className="text-style"> About </Link>}
                    </div>

                    <div className="dropdown-section">
                        <button className="button-1 button-logout" onClick={handleLogout}> Logout </button>
                    </div>

                </div>
            }
        </div>
    )
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

}

export default ProfileButton



