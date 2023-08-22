import React, {useEffect, useState} from 'react';
import Http from "../utils/Http";
import NodeImage from "../assets/images/nodes-logo-icon1.png";
import EditImage from "../assets/images/icon-edit-2.svg";
import InstallationImage from "../assets/images/node-installation-process.png";
import ArrowRightImage from "../assets/images/arrow-right.svg";

import Header from '../common/Header';
import Footer from '../common/Footer';
import ProgressBar from '../common/ProgressBar';

const WalletInstall = () => {
    const [node, selectedNode] = useState(null);
    const [walletAddress, setWalletAddress] = useState('');
    const [balance, setBalance] = useState(0);
    const [step, setStep] = useState(6);
    const [subStep, setSubStep] = useState(0);
    const [nextUrl, setNextUrl] = useState('/wallet-installation-success');
    const [prevUrl, setPrevUrl] = useState('/'); 

    const baseURL = 'http://localhost';
    const shortenAddress = (address) => {
        let newString = address.substr(0 , 5) + "..." + address.substr(-5, 5);
        return newString;
    }

    const handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        console.log(value);
        setWalletAddress(value);
    } 

    useEffect(() => {
        // installnode();
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
                                        <div className="title">Wallet identification</div>
                                        <p className="graytext mb-1">Your node will need a Web3 wallet as a source of tokens to stake and as an address to receive rewards. Choose one of the listed options, connect the wallet, and sign a message to prove your ownership.</p>
                                        <p className="graytext">If the connection fails, enter your wallet address in the field below. Make sure to enter it correctly!</p>
                                        
                                        <div className="title">
                                            <span className="install-title">NYM Wallet</span>
                                            <a className="install-button" role="button">Install wallet <img src={ArrowRightImage} /></a>
                                        </div>
                                        <div className="n_r_form_field">
                                            <div className="form-group">
                                                <img src={NodeImage} />
                                                <input type="text" className="form-control" name="wallet_address" value={walletAddress} onChange={handleChange} />
                                            </div>
                                        </div> 
                                        <div className="insufficientbalance">Please make sure that your wallet has a balance at least 101 NYM tokens - a minimum, required for node installation</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            <Footer step={step} prevUrl={prevUrl} nextUrl={nextUrl} />
        </div>
    )
}
export default WalletInstall;