import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const First = () => {

    const urlParams = new URLSearchParams(window.location.search);
    const _token = urlParams.get('token');
    const baseUrl = "http://localhost";
    const navigate = useNavigate();

    const API_URL = (process.env.NODE_ENV === 'test') ? process.env.BASE_URL || (`http://localhost:${process.env.PORT}/`) : `/`;
    const barearToken = 'Bearer '+_token;
    // let token = document.head.querySelector('meta[name="csrf-token"]');
    axios.defaults.baseURL = API_URL;
    axios.defaults.headers.common.Accept = 'application/json';
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    axios.defaults.headers.common.Authorization = barearToken;
    // axios.defaults.headers.common['X-CSRF-Token'] = token.content;
    axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
    axios.get(baseUrl + '/api/user').then(res => {
        if(res.status == 200) {
            localStorage.setItem('access_token', _token);
            navigate('/choose-server');
        }
    }).catch((error)=>{
        window.location.href = baseUrl + "/admin/wallet-connect";
    })

    useEffect(()=>{

    }, []);
    return (
        <div className="steps">
            <div className="steps-content fullwidthcontainer fiatscreen step5">
                <div className="container">
                    
                </div>
            </div>
        </div>
    )
}
export default First;