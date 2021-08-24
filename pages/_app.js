import React, { useEffect } from 'react'
import Header from "../components/Header.js"
import Footer from "../components/Footer.js"
import { UserProvider } from '../context/user';
import Meta from "../components/Meta"
import { useRouter } from 'next/router';
import "../styles/globals.css"


const Layout = ({ children }) => {

    return (
        <div>
            <div className="main-container-app">
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

    const router = useRouter();

    const handleRouteChange = (url) => {
        window.gtag('config', 'G-ZR2QVBL1EL', {
            page_path: url,
        });
    };

    useEffect(() => {
        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events]);

    return (
        <UserProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </UserProvider>
    )
}


export default MyApp

