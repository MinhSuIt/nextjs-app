import { request } from '@/utils/apiUrl'
import { Skeleton } from 'antd';
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
export default function Banner() {
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                    initialSlide: 0,
                    dots: false,
                    arrows: false,

                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    initialSlide: 0,
                    dots: false,
                    arrows: false,


                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    initialSlide: 0,
                    dots: false,
                    arrows: false,


                }
            }
        ]
    };
    const [data, setData] = useState([])
    useEffect(async () => {
        const slides = await request('get', 'slides');
        setData(slides.data);
    }, [])
    // const {data,isLoading,isError} = useFetch('slides');
    return (
        <section style={{ marginTop: 100 }}>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-12">
                        <Slider {...settings}>
                            {
                                data?.map(item => {
                                    return (
                                        <div>
                                            <img src={item.image} />
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        </section>

    )
}
