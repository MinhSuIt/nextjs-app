import Head from '@/components/layout/Head'
import Header from '@/components/layout/Header'
import Breadcrumb from './Breadcrumb'
import Layout from './Layout'

export default function LayoutOtherPage({ children, breadcrumb }) {
    return <div>
        <Layout>
            <Breadcrumb breadcrumb={breadcrumb} />
            {children}
        </Layout>

    </div>
}