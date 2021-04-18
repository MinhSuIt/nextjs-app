import React from 'react'
import Head from 'next/head'

export default function () {
    return (
        <Head>
            <title>My page title</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
        </Head>
    )
}
