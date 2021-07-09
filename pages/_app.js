import "../styles/globals.css"
import Header from "../components/Header.js"
import UserService from '../server/modules/user/userService.js'
import { useState } from "react"


const Layout = ({ children }) => {

    const [user, setUser] = useState(null)

    return (
        <div className="container-app">
            <Header user={user} setUser={setUser} />
            {children}
        </div>
    )
}


export default function App({ Component, pageProps }) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}


export async function getServerSideProps(context){

    
    const topics = await UserService.getPublicUserInfo("heiberik")
    return {
        props: {
            topicsServer: topics
        }
    }

    
}
