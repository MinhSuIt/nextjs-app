import LayoutOtherPage from '@/components/layout/LayoutBreadcrumb'
import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import { useCart } from "react-use-cart";
import { PayPalButton } from "react-paypal-button-v2";
import { request, useFetch } from '@/utils/apiUrl';
export default function () {
    const router = useRouter();
    const { query } = router

    let totalPrice = 0;

    const [orderData, setOrderData] = useState({})
    useEffect(() => {
        const data = request('get',`order/${query.order_id}`);
        setOrderData(data.data);
    }, [])
    const pay = async (gateway) => {

        const pay = request('post',`order/purchase/${gateway}/${query.order_id}`);

        if (pay.status == 200) {
            router.push(pay.data.redirectUrl);
        }
        if (pay.status == 400) {
            alert('fail payment');
        }
    }
    console.log(orderData);
    const renderOrder = () => {
        if (!orderData) {
            return "404";
        }
        return (
            <>
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
                                            {
                                                orderData?.items?.map((item) => {
                                                    return (
                                                        <tr key={item.id}>
                                                            <th colSpan={2}><span>{item.name}</span></th>
                                                            <th>{item.qty_ordered}</th>
                                                            <th> <span>{item.total}</span></th>
                                                        </tr>
                                                    )
                                                })
                                            }

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