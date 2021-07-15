import React from 'react'
import "../styles/globals.css"
import Header from "../components/Header.js"
import Footer from "../components/Footer.js"
import { UserProvider } from '../context/user';
import Meta from "../components/Meta"



const Layout = ({ children }) => {

    return (
        <div>
            <div className="container-app">
                <Header />
                <Meta
                    title="Toprocon"
                    desc="Pros and Cons of every imaginable user generated topic. Start a new discussion by adding a topic. Add your opinions to other user generated topics. Earn points. Help moderating." />

                {children}
            </div>
            <Footer />
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

