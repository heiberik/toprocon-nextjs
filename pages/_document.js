import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    <link href="https://fonts.googleapis.com/css2?family=Quicksand&display=fail" rel="stylesheet" />
                    <script
                        async
                        src="https://www.googletagmanager.com/gtag/js?id=G-ZR2QVBL1EL"
                    />

                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-ZR2QVBL1EL', { page_path: window.location.pathname });
            `,
                        }}
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument