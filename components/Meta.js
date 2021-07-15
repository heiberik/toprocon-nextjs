import Head from 'next/head';

const Meta = ({ title, desc }) => (

    <Head>

        <title key="title">{title}</title>
        <meta
            key="description"
            name="description"
            content={desc}
        />
        <meta
            key="viewport"
            name="viewport"
            content="initial-scale=1.0, width=device-width" />


    </Head>
)

export default Meta