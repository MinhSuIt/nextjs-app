import Breadcrumb from '@/components/layout/Breadcrumb'
import { useState, useEffect } from 'react'
import LayoutOtherPage from '@/components/layout/LayoutBreadcrumb'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { mergeDeepRight, split, propEq, findIndex, isEmpty, omit, isNil, mergeDeepWith, concat, pick, sort } from 'ramda'
import { produce } from 'immer'
import { productProductProduct, categoryCategoryCategory, request } from '@/utils/apiUrl'
import ReactPaginate from 'react-paginate';
import { Button, Row, Select, Skeleton, Slider } from 'antd';
import { prop } from 'ramda'
import { SearchOutlined } from '@ant-design/icons';
import { useCart } from "react-use-cart";
export default function Category() {
    const router = useRouter()
    const { addItem } = useCart();
    const { query } = router
    const { category_id, slug, page } = query
    const [searchText, setSearchText] = useState('')
    const [productProduct, setProductProduct] = useState([])
    const [productCategories, setProductCategories] = useState({})
    const categoryRequest = {
        filter: {
            id: category_id
        },
    }

    const productRequest = () => {
        const result = {
            filter: {
                "categories.id": category_id,
            },
            page: page ? page : 1,
        };
        if (!isNil(query.sort)) {
            result.sort = query.sort
        }
        if (!isNil(query['option_id'])) {
            result.filter['attributeOptions.id'] = query['option_id']
        }
        if (!isNil(query.maxprice)) {
            result.filter.maxprice = query.maxprice
        }
        if (!isNil(query.minprice)) {
            result.filter.minprice = query.minprice
        }
        if (!isNil(query.search)) {
            result.filter.name = query.search
        }
        return result
    }

    const JsonQsProduct = mergeDeepRight(productProductProduct, productRequest())
    const JsonQsCategory = mergeDeepRight(categoryCategoryCategory, categoryRequest)


    const category = productCategories && productCategories[0] 
    const { Option } = Select;
    const autoCheckOption = (id) => {
        const attributeOptions = options.filter['option_id']

        if (!isNil(attributeOptions)) {
            const attributeOptionsArr = split(',', attributeOptions)
            let pos = attributeOptionsArr.indexOf(id.toString())
            if (pos === -1) {
                return false;
            } else {
                return true
            }
        }
        return false;
    }
    const [options, setOptions] = useState({
        filter: {}
    })
    useEffect(() => {
        const attops = query['option_id']
        const minprice = query['minprice']
        const maxprice = query['maxprice']

        setOptions(produce(draft => {
            if (!isNil(attops)) draft.filter['option_id'] = attops;
            if (!isNil(minprice)) draft.filter['minprice'] = parseInt(minprice);
            if (!isNil(maxprice)) draft.filter['maxprice'] = parseInt(maxprice);
        }))
    }, [query])
    useEffect(async() => {
        const data =await Promise.all([
            request('get','products',JsonQsProduct),
            request('get','categories',JsonQsCategory),
        ])
        console.log(data);
        setProductProduct(data[0].data)
        setProductCategories(data[1].data)
    }, [])
    const handleChangeSort = (value) => {
        router.push({
            pathname: '/category/[slug]/[category_id]',
            query: { ...query, sort: value },
        })
    }
    const filterProductFunction = ({ target: { name, value } }) => {
        // C2:filter theo url

        let { filter } = options;
        if (!isNil(filter['option_id'])) {
            // let elementArr = split(',', filter[name]) //ko trùng với filter[name]
            let elementArr = split(',', filter['option_id']) //ko trùng với filter[name]
            let pos = elementArr.indexOf(value)
            if (pos === -1) {
                elementArr.push(value)
            } else {
                elementArr.splice(pos, 1)
            }
            if (!isNil(elementArr)) {
                const elementArrSorted = sort((a, b) => { return a - b; }, elementArr);
                setOptions(
                    produce(draft => {
                        draft.filter['option_id'] = elementArrSorted.join(',')
                    })
                )
            }

        } else {
            setOptions(
                produce(draft => {
                    draft.filter['option_id'] = value
                })
            )
        }
    }
    const handlePageClick = ({ selected: page }) => {
        router.push({
            pathname: '/category/[slug]/[category_id]',
            query: { ...query, page: page + 1 },
        })
    }
    const renderProductList = () => {
        // if (isLoadingProductProduct) return <Skeleton />
        // if (errorProductProduct) return <Skeleton />
        return productProduct?.data?.data?.map(item => {
            return (
                <div className="col-lg-4 col-sm-6">
                    <div className="single_product_item">
                        <img src="/img/product/product_1.png" alt="" />
                        <div className="single_product_text">
                            <h4>{item.name}</h4>
                            <h3>{item.price}</h3>
                            <a
                                onClick={() => addItem({ ...omit(['categories', 'attributes'], item) })}
                                className="add_cart">+ add to cart<i className="ti-heart" /></a>
                        </div>
                    </div>
                </div>
            )
        })
    }
    const renderOption = (item) => {
        // if (isLoadingProductProduct) return <Skeleton />
        // if (errorProductProduct) return <Skeleton />
        return item.attribute_options?.map(option => {
            return (
                <li>
                    <input
                        type="checkbox"
                        checked={autoCheckOption(option.id)}
                        name="option_id" value={option.id} onChange={(e) => {
                            return filterProductFunction(e)
                        }} />{option.name}
                    {/* <span>(250)</span> */}
                </li>
            )
        })
    }

    const changePrice = value => {
        setOptions(
            produce(draft => {
                draft.filter['minprice'] = value[0];
                draft.filter['maxprice'] = value[1];
            })
        )


    }
    const formatter = (value) => {
        const onePerhas = productProduct?.maxprice / 100
        return `${value * productProduct?.maxprice / 100}`;
    }
    const changeSearch = (e) => {
        setSearchText(e.target.value)
    }
    const search = e => {
        const queryUrl = mergeDeepRight(pick(['slug', 'category_id', 'search'], query), options.filter)
        router.push({
            pathname: '/category/[slug]/[category_id]',
            query: queryUrl,
        })
    }
    const searchTextHandle = () => {
        if (!isEmpty(searchText)) {
            router.push({
                pathname: '/category/[slug]/[category_id]',
                query: { ...pick(['slug', 'category_id'], query), search: searchText },
            })
        } else {
            router.push({
                pathname: '/category/[slug]/[category_id]',
                query: { ...pick(['slug', 'category_id'], query) },
            })
        }


    }
    return (
        <LayoutOtherPage breadcrumb={category?.name}>
            <section className="cat_product_area section_padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="left_sidebar_area">
                                {
                                    category?.attributes?.map(item => {
                                        return (
                                            <aside className="left_widgets p_filter_widgets">
                                                <div className="l_w_title">
                                                    <h3>{item.name}</h3>
                                                </div>
                                                <div className="widgets_inner">
                                                    <ul className="list">
                                                        {
                                                            renderOption(item)

                                                        }

                                                    </ul>
                                                </div>
                                            </aside>
                                        )
                                    })
                                }
                                {
                                    productProduct?.minprice &&
                                    productProduct?.maxprice &&
                                    // options.filter['minprice'] &&
                                    // options.filter['maxprice'] &&
                                    <aside className="left_widgets p_filter_widgets price_rangs_aside">
                                        <div className="l_w_title">
                                            <h3>Price Filter</h3>
                                        </div>
                                        <div className="widgets_inner">
                                            <Slider
                                                min={productProduct?.minprice}
                                                max={productProduct?.maxprice}
                                                range={true}
                                                step={1000}
                                                onChange={(value) => changePrice(value)}
                                                // defaultValue={[12000, 16300]}
                                                defaultValue={[parseInt(query.minprice), parseInt(query.maxprice)]}
                                            // defaultValue={[options.filter.minprice, options.filter.maxprice]}
                                            />
                                        </div>
                                    </aside>
                                }

                                <Row justify="space-around" align="middle">
                                    <Button
                                        type="primary"
                                        icon={<SearchOutlined />}
                                        onClick={search}
                                    >
                                        Search
                                    </Button>
                                </Row>

                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="product_top_bar d-flex justify-content-between align-items-center">
                                        <div className="single_product_menu">
                                            <p style={{ margin: 0 }}><span>{productProduct?.data?.total} </span> Product Found</p>
                                        </div>
                                        <div className="single_product_menu d-flex">
                                            <h5>short by</h5>
                                            <Select
                                                defaultValue={query.sort}
                                                style={{ width: 120 }}
                                                onChange={handleChangeSort}
                                            >
                                                <Option value="price">price tang </Option>
                                                <Option value="-price">price giam </Option>
                                                {/* <Option value="lucy">Lucy</Option> */}
                                                {/* <Option value="Yiminghe">yiminghe</Option> */}
                                            </Select>
                                        </div>
                                        <div className="single_product_menu d-flex">
                                            <div className="input-group">
                                                <input
                                                    name="search"
                                                    value={searchText}
                                                    onChange={(e) => changeSearch(e)}
                                                    type="text" className="form-control" placeholder="search" aria-describedby="inputGroupPrepend" />
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text" id="inputGroupPrepend"><i className="ti-search" onClick={searchTextHandle} /></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row align-items-center latest_product_inner">
                                {
                                    renderProductList()

                                }
                                <div className="col-lg-12">
                                    <div className="pagination">
                                        <ReactPaginate
                                            previousLabel={
                                                () => {
                                                    <a className="page-link" href="#" aria-label="Next">
                                                        <i className="ti-angle-double-right" />
                                                    </a>
                                                }
                                            }
                                            nextLabel={
                                                () =>
                                                    <a className="page-link" href="#" aria-label="Previous">
                                                        <i className="ti-angle-double-left" />
                                                    </a>
                                            }
                                            breakLabel={'..........'}
                                            breakClassName={'break-me'}
                                            pageCount={productProduct?.data?.last_page}
                                            marginPagesDisplayed={2}
                                            pageRangeDisplayed={5}
                                            onPageChange={(page) => handlePageClick(page)}
                                            containerClassName={'pagination'}
                                            // subContainerClassName={'pages pagination'}
                                            activeLinkClassName={'pagination-active'}
                                            containerClassName={'pagination justify-content-center'}
                                            pageClassName={'page-item'}
                                            pageLinkClassName={'page-link'}

                                            forcePage={productRequest().page - 1}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </LayoutOtherPage >
    )
}