import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Http from "../utils/Http";
import InstallationImage from "../assets/images/node-installation-process-icon.png";
import NodeImage from "../assets/images/nodes-logo-icon1.png";
import EditImage from "../assets/images/icon-edit-2.svg";
import Header from '../common/Header';
import Footer from '../common/Footer';
import ProgressBar from '../common/ProgressBar';
const NodeInstall = () => {
    const [walletAddress, setWalletAddress] = useState("");
    const [balance, setBalance] = useState(0);

    const navigate = useNavigate()
    const apiUrl = "http://localhost";

    const getWalletAddress = async() => {
        const formData = new FormData();
        formData.append('project_name', 'NYM');
        const res = await Http.post(apiUrl + "/api/getNodeWallet", formData);
        const _walletAddress = res.data.wallet;
        setWalletAddress(_walletAddress);
    }

    const shortenAddress = (address) => {
        let newString = '';
        if(address.length <= 10){
            newString = address;
        }else{
            newString = address.substr(0 , 5) + "..." + address.substr(-5, 5);
        }
        return newString;
    }
    useEffect(() => {
        getWalletAddress();
        setTimeout(() => {
            navigate('/bond-wallet')
        }, 10000);
    }, []);
    return (
        <div className="steps">
            <Header setBalance={setBalance} myBalance={balance} />
            <ProgressBar step={3} />
            <div className="steps-content nodeinstallation">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="borerbox border-0 bg-transparent ps-0">
                                <div className="items border-left border-down">
                                    <div className="p30">
                                        <div className="title">Node Installation</div>
                                        <div className="step-loader">
                                            <div className="img"><img src={InstallationImage} /></div>
                                            <div className="text">Installation in progress</div>
                                            <p className="graytext">The installation process may take from 2 hours to 3 days </p>
                                        </div>
                                        <div className="item border-left">
                                            <div className="img"><img src={NodeImage} /></div>
                                            <div className="text">
                                                <div className="item-name"><a href="#">NYM node</a></div>
                                                <div className="item-text">
                                                    <div className="whitetext">Wallet address: {shortenAddress(walletAddress)}</div>
                                                    <div className="bluetext">NYM Chain</div>	
                                                </div>
                                            </div>
                                            <div className="action">
                                                <a href="#"><img src={EditImage} /></a>
                                            </div>
                                        </div>
                                        <p className="graytext">The installation process may take from 2 hours to 3 days. You can close this window. We will notify you when the installation is finished and send you a link to complete the last steps. You can track progress also in your <a href="">personal area.</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default NodeInstall;