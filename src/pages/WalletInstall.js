import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Http from "../utils/Http";
import NodeImage from "../assets/images/nodes-logo-icon1.png";
import EditImage from "../assets/images/icon-edit-2.svg";
import InstallationImage from "../assets/images/node-installation-process.png";
import ArrowRightImage from "../assets/images/arrow-right.svg";
import Header from '../common/Header';
import Footer from '../common/Footer';
import ErrorModal from '../elements/ErrorModal';
import { shortenAddress } from '../utils/script';
import { apiUrl } from '../utils/urls';

const WalletInstall = () => {
    const [walletAddress, setWalletAddress] = useState('');
    const [balance, setBalance] = useState(0);
    const [walletStatus, setWalletStatus] = useState(true);
    const [step, setStep] = useState(6);
    const [minStake, setMinStake] = useState(0);
    const [subStep, setSubStep] = useState(0);
    const [nextUrl, setNextUrl] = useState('/wallet-installation-success');
    const [prevUrl, setPrevUrl] = useState('/choose-server'); 
    const [errMsg, setErrorMsg] = useState('');
    const [errorStatus, setErrorStatus] = useState(false);
    const [errorContent, setErrorContent] = useState("");
    const navigate = useNavigate();
    const gotoGuidePage = () => {
        navigate('/wallet-install-guide');
    }

    const handleChange = (e) => {
        e.preventDefault();
        setWalletStatus(true);
        const name = e.target.name;
        const value = e.target.value;
        setWalletAddress(value);
        handleErrorMemssage(false, minStake);
    } 

    const handleErrorMemssage = (errorStatus, _minStake) => {
        if(errorStatus) {
            setErrorMsg('Incorrect wallet address. Please try again');
        }else {
            let _msgStr = `Please make sure that your wallet has a balance at least ${_minStake} NYM tokens - a minimum, required for node installation`;
            setErrorMsg(_msgStr);
        }
    }

    const handleStep = async() => {
        let _walletStatus = false;
        if(walletAddress.length == 40 && walletAddress.slice(0,2) == 'n1')
        {
            const formData = new FormData();
            formData.append('wallet_address', walletAddress);
            formData.append('project_name', 'NYM');
            const result = await Http.post(apiUrl+'/api/nym/add-wallet', formData);
            console.log("result : ", result);
            _walletStatus = true;
            setWalletStatus(true);
            handleErrorMemssage(false, minStake);
        }else{
            _walletStatus = false;
            setWalletStatus(false);
            handleErrorMemssage(true, minStake);
        }
        return _walletStatus;
    }

    const getNymSettings = async() => {
        let _projectId = 0;
        const _projectResult = await Http.get(apiUrl + '/api/project/detail/NYM');
        if(_projectResult.data.status == 1)
        {
            _projectId = _projectResult.data.project.id;
        } else {
            setErrorStatus(true);
            setErrorContent("There is not NYM project");
            return;
        }
        try {
            const result = await Http.get(apiUrl+'/api/project/wizard-setting-view/'+_projectId);
            const _minStake = result.data.data.wizard_setting.min_stake*100/100;
            setMinStake(_minStake);
            handleErrorMemssage(false, _minStake);
        } catch (error) {
            setErrorStatus(true);
            setErrorContent("There is errro in getting the setting data");
        }
    }

    useEffect(() => {
        getNymSettings();
    }, []);
    return (
        <div className="steps">
            <Header setBalance={setBalance} myBalance={balance} step={6} />
            <div className="steps-content nodeinstallation">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="borerbox border-0 bg-transparent ps-0">
                                <div className="items border-left border-down">
                                    <div className="p30">
                                        <div className="title">Wallet identification</div>
                                        <p className="graytext mb-1">Your node needs a WEB3 wallet as a source of tokens to stake and as an address to receive rewards. For NYM node only NYM wallet is available.</p>
                                        <p className="graytext">Please copy your NYM wallet public address and paste in the field below.</p>
                                        
                                        <div className="title">
                                            <span className={walletStatus?"install-title":"install-title font-danger"} >NYM Wallet</span>
                                            <a className="install-button" role="button" onClick={()=>gotoGuidePage()}>Install wallet <img src={ArrowRightImage} /></a>
                                        </div>
                                        <div className="n_r_form_field">
                                            <div className="form-group">
                                                <img src={NodeImage} />
                                                <input type="text" className={walletStatus?"form-control":"form-control border-danger"} name="wallet_address" value={walletAddress} onChange={handleChange} />
                                            </div>
                                        </div> 
                                        <div className={walletStatus?"insufficientbalance":"insufficientbalance background-danger"}>{errMsg}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ErrorModal errorContent={errorContent} status={errorStatus} />
            <Footer step={step} prevUrl={prevUrl} nextUrl={nextUrl} handleStep={handleStep} />
        </div>
    )
}
export default WalletInstall;