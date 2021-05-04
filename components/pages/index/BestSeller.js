import { indexNewestFeatureProduct, fetcher, request } from '@/utils/apiUrl'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from "react-use-cart";
import { omit } from 'ramda'
export default function BestSeller() {
    const { addItem } = useCart();
    const [featureFeatureProduct, setFeatureFeatureProduct] = useState([])
    useEffect(async () => {
        const products = await request('get', 'products', indexNewestFeatureProduct)
        setFeatureFeatureProduct(products.data)
        // debugger //sử dụng debugger để ko có lỗi khi render
    }, [])
    return (
        <section className="product_list best_seller section_padding">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-12">
                        <div className="section_tittle text-center">
                            <h2>Best Sellers <span>shop</span></h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="product_list_slider owl-carousel">
                            <div className="single_product_list_slider">
                                <div className="row align-items-center justify-content-between">
                                    {
                                        featureFeatureProduct?.data?.data?.map(item => {
                                            return (
                                                <div className="col-lg-3 col-sm-6" key={item.id}>
                                                    <div className="single_product_item">
                                                        <img src="img/product/product_1.png" alt="" />
                                                        <div className="single_product_text">
                                                            <h4>{item.name}</h4>
                                                            <h3>{item.price}</h3>
                                                            <a
                                                                // href="#"
                                                                onClick={() => addItem({ ...omit(['categories', 'attributes'], item) })}
                                                                className="add_cart">+ add to cart<i className="ti-heart" /></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
