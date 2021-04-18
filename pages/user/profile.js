import LayoutOtherPage from '@/components/layout/LayoutBreadcrumb'
import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Checkbox } from 'antd'
import Link from 'next/link';
import { request } from '@/utils/apiUrl';
import { otherwise } from 'ramda';
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
    const [user, setUser] = useState({})
    const [orders, setOrders] = useState([])
    useEffect(async () => {
        const data = await Promise.all([
            request('post', 'auth/me'),
            request('get', 'order/getOrders')
        ])
        setUser(data[0].data);
        setOrders(data[1].data);
        console.log(data);
    }, [])
    return (
        <LayoutOtherPage breadcrumb={"Profile"}>
            <Link href="/order/2301">sd</Link>
            <div>
                <section className="confirmation_part padding_top">
                    <div className="container">
                        <div className="row">
                            {/* thong bao sau khi thanh toan tren url ?payment=true */}
                            {/* <div className="col-lg-12">
                                <div className="confirmation_tittle">
                                    <span>Thank you. Your order has been received.</span>
                                </div>
                            </div> */}
                            <div className="col-lg-6 col-lx-4">
                                <div className="single_confirmation_details">
                                    <h4>Customer info</h4>
                                    <Form
                                        {...layout}
                                        name="basic"
                                        initialValues={{ remember: true }}
                                        // onFinish={onFinish}
                                        // onFinishFailed={onFinishFailed}
                                    >
                                        <Form.Item
                                            label="First Name"
                                            name="first_name"
                                            rules={[{ required: true, message: 'Please input your First Name!' }]}
                                        >
                                            <Input />
                                        </Form.Item>

                                        <Form.Item
                                            label="Last Name"
                                            name="last_name"
                                            rules={[{ required: true, message: 'Please input your Last Name!' }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            label="Phone number"
                                            name="sdt"
                                            rules={[{ required: true, message: 'Please input your Phone number!' }]}
                                        >
                                            <Input.Password disabled />
                                        </Form.Item>
                                        <Form.Item
                                            label="Email"
                                            name="email"
                                            rules={[{ required: true, message: 'Please input your email!' }]}
                                        >
                                            <Input.Password disabled />
                                        </Form.Item>
                                        <Form.Item
                                            label="Address"
                                            name="address"
                                            rules={[{ required: true, message: 'Please input your address!' }]}
                                        >
                                            <Input.TextArea

                                            >
                                                <Input.Password />
                                            </Input.TextArea>
                                        </Form.Item>

                                        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                                            <Checkbox>Remember me</Checkbox>
                                        </Form.Item>

                                        <Form.Item {...tailLayout}>
                                            <Button type="primary" htmlType="submit">
                                                Update
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                            </div>
                            <div className="col-lg-6 col-lx-4">
                                <div className="single_confirmation_details">
                                    <h4>Account:</h4>
                                    <Form
                                        {...layout}
                                        name="basic"
                                        initialValues={{ remember: true }}
                                        onFinish={onFinish}
                                        onFinishFailed={onFinishFailed}
                                    >
                                        <Form.Item
                                            label="Email"
                                            name="email"
                                            rules={[{ required: true, message: 'Please input your email!' }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            label="Password"
                                            name="password"
                                            rules={[{ required: true, message: 'Please input your password!' }]}
                                        >
                                            <Input />
                                        </Form.Item>


                                        <Form.Item {...tailLayout}>
                                            <Button type="primary" htmlType="submit">
                                                Update
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="order_details_iner">
                                    <h3>Order Detail Lists</h3>
                                    <table className="table table-borderless">
                                        <thead>
                                            <th >Time</th>
                                            <th >Total</th>
                                            <th >Product</th>
                                            <th >Payment</th>
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
                                                                {item?.payment?.method}
                                                            </td>
                                                            <td>
                                                                {item?.status}
                                                            </td>
                                                            <td>
                                                                <Button type="success" disabled={!!item.payment}>
                                                                    Pay
                                                                </Button>
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
            </div>
        </LayoutOtherPage>

    )
}
