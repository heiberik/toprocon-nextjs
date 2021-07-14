import { createContext, useState } from 'react'

const UserContext = createContext(null)

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(0)

    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;