import LayoutOtherPage from '@/components/layout/LayoutBreadcrumb'
import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import { useCart } from "react-use-cart";
import { PayPalButton } from "react-paypal-button-v2";
import { request } from '@/utils/apiUrl';
export default function () {
    const router = useRouter();
    const { query } = router
    const { order_id } = query
    const [orderData, setOrderData] = useState({})
    let totalPrice = 0;

    const pay = async (gateway) => {
        const pay = await request('post', `order/purchase/${gateway}/${router.query.order_id}`)

        if (pay.status == 200) {
            router.push(pay.data.redirectUrl);
        }
    }
    useEffect(async () => {
        const url = `order/${order_id}`
        const order = await request('get', url)  
        setOrderData(order.data)
    }, [])
    const renderOrder = () => {
        if (!order_id) {
            return "404";
        }
        return (
            <>
                <section className="cart_area padding_top">
                    <div className="container">
                        <div className="cart_inner">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Product</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            orderData?.items?.map((item) => (
                                                <tr>
                                                    <td>
                                                        <div className="media">
                                                            <div className="d-flex">
                                                                <img src="img/product/single-product/cart-1.jpg" alt="" />
                                                            </div>
                                                            <div className="media-body">
                                                                <p>{item.name}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <h5>{item.price}</h5>
                                                    </td>
                                                    <td>
                                                        <div className="product_count">

                                                            <input className="input-number" type="text" value={item.qty_ordered} disabled />

                                                        </div>
                                                    </td>
                                                    <td>
                                                        <h5>{item.total}</h5>
                                                    </td>
                                                </tr>
                                            ))

                                        }
                                        <tr>
                                            <td />
                                            <td />
                                            <td>
                                                <h5>Subtotal</h5>
                                            </td>
                                            <td>
                                                <h5>{orderData?.sub_total}</h5>
                                            </td>
                                        </tr>
                                        <tr className="shipping_area">
                                            <td />
                                            <td />
                                            <td>

                                            </td>
                                            <td>
                                                <div className="shipping_box">
                                                    <input type="textarea" name="address" placeholder="Address" value={orderData?.address} disabled />
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="checkout_btn_inner float-right">
                                    <a className="btn_1" onClick={() => pay('PayPal_Rest')}>Pay with Paypal</a>
                                    <a className="btn_1" onClick={() => pay('VNPay')}>Pay with VNPAy</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="confirmation_part padding_top">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="confirmation_tittle">
                                    <span>Thank you. Your order has been received.</span>
                                </div>
                            </div>
                            <div className="col-lg-6 col-lx-4">
                                <div className="single_confirmation_details">
                                    <h4>order info</h4>
                                    <ul>
                                        <li>
                                            <p>order number</p><span>: 60235</span>
                                        </li>
                                        <li>
                                            <p>data</p><span>: Oct 03, 2017</span>
                                        </li>
                                        <li>
                                            <p>total</p><span>: USD 2210</span>
                                        </li>
                                        <li>
                                            <p>mayment methord</p><span>: Check payments</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-6 col-lx-4">
                                <div className="single_confirmation_details">
                                    <h4>Billing Address</h4>
                                    <ul>
                                        <li>
                                            <p>Street</p><span>: 56/8</span>
                                        </li>
                                        <li>
                                            <p>city</p><span>: Los Angeles</span>
                                        </li>
                                        <li>
                                            <p>country</p><span>: United States</span>
                                        </li>
                                        <li>
                                            <p>postcode</p><span>: 36952</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-6 col-lx-4">
                                <div className="single_confirmation_details">
                                    <h4>shipping Address</h4>
                                    <ul>
                                        <li>
                                            <p>Street</p><span>: 56/8</span>
                                        </li>
                                        <li>
                                            <p>city</p><span>: Los Angeles</span>
                                        </li>
                                        <li>
                                            <p>country</p><span>: United States</span>
                                        </li>
                                        <li>
                                            <p>postcode</p><span>: 36952</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="order_details_iner">
                                    <h3>Order Details</h3>
                                    <table className="table table-borderless">
                                        <thead>
                                            <tr>
                                                <th scope="col" colSpan={2}>Product</th>
                                                <th scope="col">Quantity</th>
                                                <th scope="col">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th colSpan={2}><span>Pixelstore fresh Blackberry</span></th>
                                                <th>x02</th>
                                                <th> <span>$720.00</span></th>
                                            </tr>
                                            <tr>
                                                <th colSpan={2}><span>Pixelstore fresh Blackberry</span></th>
                                                <th>x02</th>
                                                <th> <span>$720.00</span></th>
                                            </tr>
                                            <tr>
                                                <th colSpan={2}><span>Pixelstore fresh Blackberry</span></th>
                                                <th>x02</th>
                                                <th> <span>$720.00</span></th>
                                            </tr>
                                            <tr>
                                                <th colSpan={3}>Subtotal</th>
                                                <th> <span>$2160.00</span></th>
                                            </tr>
                                            <tr>
                                                <th colSpan={3}>shipping</th>
                                                <th><span>flat rate: $50.00</span></th>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th scope="col" colSpan={3}>Quantity</th>
                                                <th scope="col">Total</th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )


    }

    return (
        <LayoutOtherPage breadcrumb={"order"}>
            {renderOrder()}
        </LayoutOtherPage >
    )
}
//chinh sua lai giao dien,kiem tra tinh nang login tai sao khi chuyen trang lai mat,fix loi trong console