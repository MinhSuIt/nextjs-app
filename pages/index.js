import React from 'react'
import Footer from '@/components/layout/Footer'
import Layout from '@/components/layout/Layout'
import Feature from '@/components/pages/index/Feature'
import Banner from '@/components/pages/index/Banner'
import BestSeller from '@/components/pages/index/BestSeller'
import ClientLogo from '@/components/pages/index/ClientLogo'
import Subcribe from '@/components/pages/index/Subcribe'
export default function Index() {
    return (
            <Layout>
                <Banner />
                 <Feature />

                <BestSeller />

                <Subcribe />

                <ClientLogo /> 

                <Footer />
            </Layout>
    )
}
