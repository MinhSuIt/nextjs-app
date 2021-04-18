import Head from '@/components/layout/Head'
import Header from '@/components/layout/Header'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { isNil, isEmpty } from 'ramda'
import axios from '@/utils/axios'
import { useRouter } from 'next/router'
import { BackTop } from 'antd';
export default function Layout({ children }) {
    const dispatch = useDispatch()
    const router = useRouter()
    const { auth } = useSelector(state => state);
    const getAuthFromLocal = () => {
        return JSON.parse(localStorage.getItem('auth'));
    }
    const hasAuth = (authData) => {
        if (!isNil(authData) || isEmpty(authData)) {
            return true;
        }
        return false;
    }
    const hasToken = (authData) => {
        if (hasAuth(authData)) {
            if (!isNil(authData.token) || isEmpty(authData.token)) {
                return true;
            }
        }
        return false;
    }
    useEffect(async () => {
        const authData = getAuthFromLocal();
        if (hasToken(authData)) {
            dispatch({
                type: 'SETAUTHBOOLEAN', auth: authData
            })
        }
    },[])

    return (
        <div>
            <Head />
            <Header />
            {children}
            <BackTop />
        </div>
    )

}
// lam chuc nang refresh token o inteceptor axios