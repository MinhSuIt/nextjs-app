import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useFetch, indexHeaderCategories, request } from '@/utils/apiUrl.js'
import { SearchOutlined, LoginOutlined, ShoppingCartOutlined, StarFilled, LoginFilled, UserOutlined } from '@ant-design/icons';
import Modal from 'antd/lib/modal/Modal';
import { Form, Input, Button, Checkbox, Menu, Dropdown } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { isNil, isEmpty, toPairs } from 'ramda'
import { useRouter } from 'next/router'
import { useMediaQuery } from 'react-responsive'
import Animate from 'rc-animate';




import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { useCart } from 'react-use-cart'
import classNames from 'classnames'
const { SubMenu } = Menu;


export default function Header() {
    const {
        isEmpty,
        totalUniqueItems,
        items,
        updateItemQuantity,
        totalItems,
        removeItem,
    } = useCart();
    // const { data: headerCategories, isError: errorHeaderCategories } = useFetch('categories', indexHeaderCategories)
    const [headerCategories, setHeaderCategories] = useState([])
    const [visible, setVisible] = useState(false)
    const [visibleLogin, setVisibleLogin] = useState(false)
    const { auth } = useSelector(state => state);
    const dispatch = useDispatch()
    const router = useRouter()
    const [loginMessage, setLoginMessage] = useState()

    const [form] = Form.useForm();
    const [menuState, setMenuState] = useState(false)
    const handleModal = () => {
        setVisible(prev => !prev)
    }
    const handleModalLogin = () => {
        setVisibleLogin(prev => !prev)
        setLoginMessage(null);
        form.setFields([
            {
                name: 'email',
                value: '',
                errors: []
            },
            {
                name: 'password',
                value: '',
                errors: []
            }
        ])
    }
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
    };
    const tailLayout = {
        wrapperCol: { offset: 4, span: 20 },
    };
    // useEffect(() => {
    //     if (isTabletOrMobile) {
    //         setMenuState(true);
    //     }
    //     if (isDesktopOrLaptop) {
    //         setMenuState(false);
    //     }
    // }, [])
    const onFinish = async (values) => {
        // console.log(form.getFieldsError);
        try {
            const res = await request('post', 'auth/login', {}, values);


            if (!isNil(res.data)) {

                setVisibleLogin(false)
                // axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.access_token
                let auth = {
                    isAuth: true, token: res.data.access_token
                }
                localStorage.setItem('auth', JSON.stringify(auth))

                const user = await request('post', 'auth/me')
                auth = { ...auth, user: user.data }
                dispatch({
                    type: 'SETAUTHBOOLEAN', auth: auth
                })
                localStorage.setItem('auth', JSON.stringify(auth))

                router.push('/');
            }
        } catch (err) {
            const { response } = err
            if (isNil(response?.status)) {
                setLoginMessage('Login fail')
            }
            console.log(err);
            if (response?.status === 400) {
                let { data } = response
                let fields = toPairs(data);
                fields = fields.map(item => {
                    return {
                        name: item[0],
                        errors: item[1],
                    }
                })
                // console.log(fields);
                form.setFields(fields)
                setLoginMessage('Login fail')

            }
        }


    };
    useEffect(async () => {
        if (router.query.visibleLogin) {
            setVisibleLogin(true)
        }

        const data = await request('get', 'categories', indexHeaderCategories);
        console.log(data);
        setHeaderCategories(data.data);
    }, []);
    const onFinishFailed = (errorInfo) => {
        setLoginMessage('Login fail')
    };
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-device-width: 1224px)'
    })
    const isBigScreen = useMediaQuery({ query: '(min-device-width: 1824px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const isTabletOrMobileDevice = useMediaQuery({
        query: '(max-device-width: 1224px)'
    })

    const handleLogout = async () => {
        try {
            const user = await request('post', 'auth/logout')
            if (user.status == 200) {
                localStorage.removeItem('auth')
                dispatch({ type: 'SETAUTHBOOLEAN', auth: { isAuth: false, token: '', user: {} } })
            }
        } catch (error) {
            localStorage.removeItem('auth')
            dispatch({ type: 'SETAUTHBOOLEAN', auth: { isAuth: false, token: '', user: {} } })
        }


    }


    const onAppear = (key) => {
        console.log('appear', key);
    }

    const onEnter = (key) => {
        console.log('enter', key);
    }

    const onLeave = (key) => {
        console.log('leave', key);
    }

    const renderDesktopOrLaptop = () => {
        const menu = (
            <Menu>
                <Menu.Item>
                    <Link href="user/profile">
                        <a target="" rel="noopener noreferrer">
                            Profile
                        </a>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" onClick={handleLogout}>
                        Log out
                </a>
                </Menu.Item>
            </Menu>
        );
        return (
            <header className="main_menu home_menu">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12">
                            <nav className="navbar navbar-expand-lg navbar-light">
                                <Link href="/" >
                                    <a className="navbar-brand"> <img src="/img/logo.png" alt="logo" /> </a>
                                </Link>
                                <button
                                    className="navbar-toggler"
                                    type="button"
                                    aria-label="Toggle navigation"
                                    onClick={() => setMenuState(prev => !prev)}
                                >
                                    <span className="menu_icon"><i className="fas fa-bars" /></span>
                                </button>
                                {/* <Animate
                                    component=""
                                    showProp="menuState"
                                    onAppear={onAppear}
                                    onEnter={onEnter}
                                    onLeave={onLeave}
                                    transitionAppear
                                    transitionName="fade"
                                > */}
                                <div className={classNames({
                                    "collapse": true,
                                    "navbar-collapse": true,
                                    "main-menu-item": true,
                                    "show": menuState ? true : false
                                })}
                                    id="navbarSupportedContent">
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <Link href="/" >
                                                <a className="nav-link">Home</a>
                                            </Link>
                                        </li>

                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" id="navbarDropdown_1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Categories
                                                </a>
                                            <div className="dropdown-menu" aria-labelledby="navbarDropdown_1">
                                                {
                                                    headerCategories?.map((item) => {
                                                        return (
                                                            <Link href={`/category/${item.slug}/${item.id}`} key={item.id}>
                                                                <a
                                                                    className="dropdown-item"
                                                                // onClick={() => router.push(`/category/${item.slug}/${item.id}`)}
                                                                >{item.name}</a>
                                                            </Link>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </li>
                                        {/* <li className="nav-item dropdown">
                                                <a className="nav-link dropdown-toggle" href="blog.html" id="navbarDropdown_3" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    pages
                                                </a>
                                                <div className="dropdown-menu" aria-labelledby="navbarDropdown_2">
                                                    <a className="dropdown-item" href="login.html"> login</a>
                                                    <a className="dropdown-item" href="tracking.html">tracking</a>
                                                    <a className="dropdown-item" href="checkout.html">product checkout</a>
                                                    <a className="dropdown-item" href="cart.html">shopping cart</a>
                                                    <a className="dropdown-item" href="confirmation.html">confirmation</a>
                                                    <a className="dropdown-item" href="elements.html">elements</a>
                                                </div>
                                            </li>
                                            <li className="nav-item dropdown">
                                                <a className="nav-link dropdown-toggle" href="blog.html" id="navbarDropdown_2" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    blog
                                                </a>
                                                <div className="dropdown-menu" aria-labelledby="navbarDropdown_2">
                                                    <a className="dropdown-item" href="blog.html"> blog</a>
                                                    <a className="dropdown-item" href="single-blog.html">Single blog</a>
                                                </div>
                                            </li> */}
                                    </ul>
                                </div>
                                {/* </Animate> */}

                                <div className="hearer_icon d-flex">
                                    <Modal
                                        // title="Search: "
                                        visible={visible}
                                        onOk={() => handleModal()}
                                        onCancel={() => handleModal()}
                                    // okButtonProps={{ disabled: true }}
                                    // cancelButtonProps={{ disabled: true }}
                                    >
                                        <div className="search_input" id="search_input_box">
                                            <div className="container ">
                                                <form className="d-flex justify-content-between search-inner">
                                                    <input type="text" className="form-control" id="search_input" placeholder="Search Here" />
                                                    <button type="submit" className="btn" />
                                                </form>
                                            </div>
                                        </div>
                                    </Modal>
                                    <a onClick={() => handleModal()}><i className="ti-search" /></a>
                                    <Modal
                                        title={loginMessage}
                                        visible={visibleLogin}
                                        onOk={() => handleModalLogin()}
                                        closable={false}
                                        footer={null}
                                        onCancel={() => handleModalLogin()}
                                    // okButtonProps={{ disabled: true }}
                                    // cancelButtonProps={{ disabled: true }}
                                    >
                                        <Form
                                            form={form}
                                            {...layout}
                                            name="basic"
                                            initialValues={{ remember: true }}
                                            onFinish={(values) => onFinish(values)}
                                            onFinishFailed={onFinishFailed}
                                        >
                                            <Form.Item
                                                label="email"
                                                name="email"
                                                rules={[{ required: true, message: 'Please input your email!' }]}

                                            // initialValue="grady.larson@example.net"
                                            >
                                                <Input allowClear />
                                            </Form.Item>

                                            <Form.Item
                                                label="Password"
                                                name="password"
                                                rules={[{ required: true, message: 'Please input your password!' }]}
                                            // initialValue="123456"
                                            >

                                                <Input.Password allowClear />
                                            </Form.Item>

                                            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                                                <Checkbox>Remember me</Checkbox>
                                            </Form.Item>

                                            <Form.Item {...tailLayout}>
                                                <Button type="primary" htmlType="submit">
                                                    Submit
                                                </Button>
                                            </Form.Item>
                                        </Form>
                                    </Modal>


                                    {/* <a href><i className="ti-heart" /></a> */}

                                    <div className="dropdown cart">
                                        <Link href="/cart">
                                            <a className="dropdown-toggle cart-main" href="#" id="navbarDropdown3" role="button">
                                                <i className="fas fa-cart-plus active" />
                                                <sup className="count">{totalUniqueItems}</sup>
                                            </a>
                                        </Link>
                                    </div>

                                    {
                                        !auth.isAuth ? (
                                            <div style={{ margin: 0, marginLeft: 30, marginTop: 4 }}>
                                                <a style={{ display: "flex" }} onClick={() => handleModalLogin()}><LoginOutlined /></a>
                                            </div>
                                        ) : (
                                            <div style={{ marginLeft: "30px", marginTop: "-4px" }}>
                                                <Dropdown overlay={menu} placement="bottomCenter"
                                                // overlayStyle={{ marginLeft: 30, marginTop: 3 }}
                                                >
                                                    {/* <Button > */}
                                                    <UserOutlined />
                                                    {/* <a style={{ display: "flex" }}>{auth.user?.name}123</a> */}
                                                    {/* </Button> */}
                                                </Dropdown>
                                            </div>
                                        )
                                    }
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>

            </header >
        )
    }
    // return isDesktopOrLaptop && renderDesktopOrLaptop()
    return renderDesktopOrLaptop()
}
const Box = props => {
    console.log('render', props.visible);
    const style = {
        display: props.visible ? 'block' : 'none',
        marginTop: '20px',
        width: '200px',
        height: '200px',
        backgroundColor: 'red',
    };
    return (<div style={style} />);
};