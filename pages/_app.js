import React from 'react'
import "../styles/globals.css"
import Header from "../components/Header.js"
import { UserProvider } from '../context/user';



const Layout = ({ children }) => {

    return (
        <div>
            <div className="container-app">
                <Header />
                {children}
            </div>
        </div>
    )
}


const MyApp = ({ Component, pageProps }) => {

    return (
        <UserProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </UserProvider>
    )
}


export default MyApp

