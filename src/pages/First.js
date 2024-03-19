import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../utils/urls';

const First = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const _token = urlParams.get('token');
    const navigate = useNavigate();
    const API_URL = apiUrl;
    const barearToken = 'Bearer '+_token;
    // let token = document.head.querySelector('meta[name="csrf-token"]');

    const checkAuthentication = async() => {
        axios.defaults.baseURL = API_URL;
        axios.defaults.headers.common.Accept = 'application/json';
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        axios.defaults.headers.common.Authorization = barearToken;
        // axios.defaults.headers.common['X-CSRF-Token'] = '';
        axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
        axios.get(apiUrl + '/api/user/').then(res => {
            if(res.data.success) {
                localStorage.setItem('access_token', res.data.data.token);
                navigate('/choose-server');
            }else{
                window.location.href = apiUrl + "/admin/add-new-node";
            }
        }).catch((error)=>{
            window.location.href = apiUrl + "/admin/add-new-node";
        })
    }

    useEffect(()=>{
        checkAuthentication();
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
