import React from 'react'

export default function Breadcrumb({ breadcrumb }) {
    return (
        <section className="breadcrumb breadcrumb_bg">
            {/* <section> */}
            <div className="container" style={{ zIndex: 9,position:"absolute",top:"50%", left: 0 }}>
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="breadcrumb_iner">
                            <div className="breadcrumb_iner_item">
                                <h2>{breadcrumb}</h2>
                                {/* <p>Home <span>-</span> Shop Category</p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{
                left: 0
            }}>
                <img src="/img/breadcrumb.png" />
            </div>
        </section>
    )
}
