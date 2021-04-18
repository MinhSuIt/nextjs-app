import LayoutOtherPage from '@/components/layout/LayoutBreadcrumb'

import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import { useCart } from "react-use-cart";
import { PayPalButton } from "react-paypal-button-v2";
import { request } from '@/utils/apiUrl';
export default function cart() {
    const {
        isEmpty,
        items,
        updateItemQuantity,
        emptyCart
    } = useCart();
    const router = useRouter()
    let totalPrice = 0;
    const itemsTemp = items.map(item => {
        item.total = item.quantity * item.price
        totalPrice += item.total
        return item
    })
    const order = async (e) => {
        e.preventDefault();
        const createOrder = await request('post', 'order/create', { items: items })

        if (createOrder.status === 201) {
            emptyCart()
            router.push({
                pathname: '/order/[order_id]',
                query: { order_id: createOrder.data.id },
            })
        }
    }

    const renderCart = () => {

        if (isEmpty) return <p>Your cart is empty</p>;
        return (
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
                                        itemsTemp.map((item) => (
                                            <tr key={item.id}>
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
                                                        <span
                                                            className="input-number-decrement"> <i className="ti-angle-down"
                                                                onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                                                            /></span>
                                                        <input className="input-number" type="text" value={item.quantity} min={0} max={10} />
                                                        <span
                                                            className="input-number-increment"> <i className="ti-angle-up"
                                                                onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                                                            /></span>
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
                                            <h5>{totalPrice}</h5>
                                        </td>
                                    </tr>
                                    <tr className="shipping_area">
                                        <td />
                                        <td />
                                        <td>

                                        </td>
                                        <td>
                                            <div className="shipping_box">
                                                <input type="textarea" name="address" placeholder="Address" />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="checkout_btn_inner float-right">
                                <a className="btn_1" onClick={() => router.back()}>Continue Shopping</a>
                                <a className="btn_1" onClick={(e) => order(e)}>Order</a>
                                {/* <a className="btn_1">Check out with PayPal</a> */}
                                {/* <img src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/checkout-logo-large.png" alt="Check out with PayPal" /> */}
                                {/* <PayPalButton
                                    //client integration
                                    amount="10"
                                    options={{
                                        clientId: "ARfV2Prm8u4VD5p_qOE-D0BgaXFQu1t3ybmYLkytGf5srG388AxNHOsVtidEGoWIfvCclZqs3aU9t69c"
                                    }}
                                    // createOrder={(data, actions) => {
                                    //     // This function sets up the details of the transaction, including the amount and line item details.
                                    //     return actions.order.create({
                                    //         purchase_units: [{
                                    //             amount: {
                                    //                 value: '5',
                                    //                 description: 'Mua online'
                                    //             }
                                    //         }]
                                    //     });
                                    // }}
                                    // onApprove={
                                    //     (data, actions) => {

                                    //         // This function captures the funds from the transaction.

                                    //         return actions.order.capture().then(function (details) {
                                    //             // This function shows a transaction success message to your buyer.
                                    //             alert('Transaction completed by ' + details.payer.name.given_name);
                                    //         });
                                    //     }
                                    // }
                                    // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                                    onSuccess={(details, data) => {
                                        // alert("Transaction completed by " + details.payer.name.given_name);
                                        // OPTIONAL: Call your server to save the transaction
                                        // return fetch("/paypal-transaction-complete", {
                                        //     method: "post",
                                        //     body: JSON.stringify({
                                        //         orderID: data.orderID
                                        //     })
                                        // });
                                    }}

                                /> */}

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )


    }
    return (
        <LayoutOtherPage breadcrumb={"cart"}>
            {renderCart()}
        </LayoutOtherPage >
    )
}
