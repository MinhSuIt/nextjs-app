import LayoutOtherPage from '@/components/layout/LayoutBreadcrumb'
import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Checkbox } from 'antd'
import Link from 'next/link';
import { request } from '@/utils/apiUrl';
import { otherwise } from 'ramda';
import { useRouter } from 'next/router';
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};
const tailLayout = {
    wrapperCol: { offset: 4, span: 20 },
};
export default function Profile() {

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const [orders, setOrders] = useState([])
    const [user, setUser] = useState({})
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    useEffect(async () => {
        const data = await Promise.all([
            request('post', 'auth/me'),
            request('get', 'order/getOrders')
        ])
        console.log(data);

        setUser(data[0].data);
        setOrders(data[1].data.data);
    }, [])
    const pay = async (gateway, order_id) => {
        setLoading(true)
        const data = await request('post', `order/purchase/${gateway}/${order_id}`)
        // hien loadding

        window.location.assign(data.data.redirectUrl)
        // window.open(data.data.redirectUrl)

        console.log(data);
        // alert(123);
    }
    return (



        <LayoutOtherPage breadcrumb={"Profile"}>
            {loading ? <h1>Loading</h1> :
                <div>
                    <section className="confirmation_part">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="order_details_iner">
                                        <h3>Order Detail Lists</h3>
                                        <table className="table table-borderless">
                                            <thead>
                                                <th >Time</th>
                                                <th >Total</th>
                                                <th >Product</th>
                                                <th >Status</th>
                                                <th >Pay</th>
                                                <th ></th>
                                            </thead>
                                            <tbody>
                                                {
                                                    orders?.map(item => {
                                                        return (
                                                            <tr key={item.id}>
                                                                <td >{item.created_at}</td>
                                                                <td> <span>{item.sub_total}</span></td>
                                                                <td>
                                                                    {
                                                                        item?.items?.map(items => {
                                                                            return <div>{items.name} x {items.qty_ordered}</div>
                                                                        })
                                                                    }

                                                                </td>
                                                                <td>
                                                                    {item?.status}
                                                                </td>
                                                                <td>
                                                                    {
                                                                        item.canPayment === false ? (
                                                                            <p>{item?.payment?.method}</p>
                                                                        ) : (
                                                                            <>
                                                                                <Button type="success" disabled={!!item.payment}
                                                                                    onClick={() => pay('PayPal_Rest', item.id)}
                                                                                >
                                                                                    Pay Paypal
                                                                            </Button>
                                                                                <Button type="info" disabled={!!item.payment}
                                                                                    onClick={() => pay('VNPay', item.id)}
                                                                                >
                                                                                    Pay VNPay
                                                                            </Button>
                                                                            </>
                                                                        )
                                                                    }

                                                                </td>
                                                                <td>
                                                                    <Button type="primary">
                                                                        Detail
                                                                </Button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }



                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div >
            }
        </LayoutOtherPage >

    )
}
