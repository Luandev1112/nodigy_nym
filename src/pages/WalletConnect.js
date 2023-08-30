import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import { Button, Dropdown, Modal } from 'react-bootstrap';
import LogoImage from "../assets/images/logo.svg";
import IconEmptyWallet from "../assets/images/icon-empty-wallet.png";
import IconNotifications from "../assets/images/icon-notifications.png";
import IconSettingsImage from "../assets/images/icon-setings.png";
import IconLogoutImage from "../assets/images/icon-setings.png";
import ProfileImage from "../assets/images/profile-img.png";

import Step3 from "../components/wallet/step3.js";
import Step4 from "../components/wallet/step4.js";
import Fiat1 from "../components/wallet/fiat1.js";
import WalletList from "../components/wallet/WalletList.js";
import ChooseServer from "../components/wallet/ChooseServer.js";
import TopupAccount from "../components/wallet/TopupAccount.js";
import DepositSuccess from "../components/wallet/DepositSuccess.js";
import DepositFail from '../components/wallet/DepositFail';
import WalletInstall from '../components/wallet/WalletInstall';
import NodeInstall from '../components/wallet/NodeInstall';
import NodePreparation from '../components/wallet/NodePreparation';
import NodeSuccess from '../components/wallet/NodeSuccess';
import NodeRequirement4 from '../components/wallet/NodeRequrement4';
import NodeRequirement1 from '../components/wallet/NodeRequrement1';
import NodeRequirement2 from '../components/wallet/NodeRequrement2';
import NodeRequirement3 from '../components/wallet/NodeRequrement3';
import Http from "../utils/Http";

const WalletConnect = () => {
    const [step, setStep] = useState(3);
    const [disableBtn, setDisableBtn] = useState('prev');
    const [btnStatus, setBtnStatus] = useState(true);
    const [leftOffset, setLeftOffset] = useState(0);
    const [subStep, setSubStep] = useState('');
    const [myBalance, setMyBalance] = useState(0);
    const [walletName, setWalletName] = useState('');
    const [installWallet, setIstallWallet] = useState(null);
    const [chkStatus, setChkStatus] = useState(true);
    const [darkMode, setDarkMode] = useState(true);
    const [loggedUser, setLoggedUser] = useState(null);
    const [project, setProject] = useState(null);
    const [server, setServer] = useState(null);
    const [wallet, setWallet] = useState(null);
    const [chain, setChain] = useState(null);

    const baseURL = "https://nodigy.com";

    const changeMode = () => {
        darkMode ? setDarkMode(false) : setDarkMode(true);
    }

    const handleChecked = (e) => {
        const chkData = e.target.value;
        console.log(chkData);
    } 

    const chooseProject = (project) => {
        setProject(project)
    }

    const chooseServer = (server) => {
        setServer(server);
    }

    const chooseWallet = (wallet) => {
        setWallet(wallet);
    }

    const chooseChain = (chain) => {
        setChain(chain);
    }

    const nextStep = () => {
        if(step < 8){
            
            if(step == 7){
                setDisableBtn('next');
            }else{
                setDisableBtn('none')
            }
            if(step == 7){
                switch(subStep){
                    case '':
                        setSubStep('node-install-success');
                    break;
                    case 'node-install-success':
                        setSubStep('stake-1');
                    break;
                    case 'stake-1':
                        setSubStep('stake-2');
                    break;
                    case 'stake-2':
                        setSubStep('stake-3');
                    break;
                    case 'stake-3':
                        setSubStep('stake-4');
                    break;
                    case 'stake-4':
                        // setSubStep('stake-2');
                    break;
                }
            }else{
                switch(step){
                    case 1:
                        setStep(step + 1);    
                    break;
                    case 2:
                        if(project) {
                            setStep(step + 1);
                            setSubStep('');
                        }
                    break;
                    case 3:
                        if(server) {
                            setStep(step + 1);
                            setSubStep('');
                        }
                    break;
                    case 4:
                        console.log("Wallet: ", wallet);
                        if(wallet) {
                            setStep(step + 2);
                            setSubStep('');
                        }
                    break;
                    case 6:
                        if(chain){
                            setStep(7);
                            setSubStep('');
                        }
                }
            }
        }
    }

    const prevStep = () => {
        if(step > 1) {
            if(step == 2){
                setDisableBtn('prev');
            }else{
                setDisableBtn('none')
            }
            setStep(step - 1);
            setSubStep('');
        }
    }

    const gotoPage = () => {
        console.log("91");
    }

    const getTestUser = async () => {
        const user = await Http(baseURL + "/admin/getTestUser");
        if(user.data) {
            setLoggedUser(user.data);
            setMyBalance(user.data.balance);
        }
    }

    const getUnpublishedNode = async() => {
        const nodeRes = await Http(baseURL + "/api/nym/getInitialNode");
        setProject(nodeRes.data.project);
        setServer(nodeRes.data.server);
    }

    useEffect(() => {
        const offsets = document.querySelectorAll('.step-bar a.active');
        const leftoffset = offsets[offsets.length - 1].offsetLeft;
        setLeftOffset(leftoffset);
        console.log(leftoffset);
    }, [step]);

    useEffect(() => {
        getTestUser();
        getUnpublishedNode();
    }, []);

    return (
        <div className="steps">
            <div className="step-header">
                <div className="container">
                    <div className="logo"><img src={LogoImage} /></div>
                    <div className="btn-header actionright">
                        <div className="walletdropdown">
                            <button aria-haspopup="true" aria-expanded="false" id="" type="button" className="dropdown-toggle btn btn-default">
                            <img src={IconEmptyWallet} /> <span>{myBalance} USDT</span>
                            </button>
                        </div>

                        <Dropdown className="notifications">
                            <Dropdown.Toggle variant="default" id="">
                                <img src={IconNotifications} />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <li><Dropdown.Item>Option 1</Dropdown.Item></li>
                                <li><Dropdown.Item>Option 2</Dropdown.Item></li>
                            </Dropdown.Menu>
                        </Dropdown>
                        
                        <Dropdown className="profiledropdown">
                            <Dropdown.Toggle variant="default" id="">
                                <div className="img"><img src={ProfileImage} /></div>
                                {/* <span>Кузнецова Мария</span> */}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <li className="title"><Dropdown.Item>Кузнецова Мария</Dropdown.Item></li>
                                <li><Dropdown.Item><img src={IconSettingsImage} /> Account settings</Dropdown.Item></li>
                                <li><Dropdown.Item><img src={IconLogoutImage} /> Logout</Dropdown.Item></li>
                                <li className="last">
                                    <span className="text">Dark mode</span>
                                    <div className="cus_switch themechange">
                                        <input type="checkbox" checked={darkMode} onChange={changeMode} />
                                        <span></span>
                                    </div>
                                </li>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>
            <div className="step-bar">
                <div className="line"><span style={{width: leftOffset+"px"}}></span></div>
                <a className={step>=1?"checked active":""} />
                <a className={step>=2?"checked active":""} />
                <a className={step>=3?"checked active":""} />
                <a className={step>=4?"checked active":""} />
                <a className={step>=5?"checked active":""} />
                <a className={step>=6?"checked active":""} />
                <a className={step>=7?"checked active":""} />
                <a className={step>=8?"checked active":""} />
            </div>
            {/* { step == 3 && <Step3 /> } */}
            { step == 3 && subStep == '' && <ChooseServer setStep={setStep} setSubStep={setSubStep} balance={myBalance} setMyBalance={setMyBalance} chooseServer={chooseServer} project={project} server={server} /> }
            { step == 3 && subStep == 'topup' && <TopupAccount setStep={setStep} setSubStep={setSubStep} setMyBalance={setMyBalance} balanceType="server" />}
            { step == 4 && <WalletList setWalletName={setWalletName} setStep={setStep} chooseUserWallet={chooseWallet} /> }
            { step == 5 && subStep=='' && <WalletInstall setWallet={setWallet} /> }
            { step == 5 && subStep == 'topup' && <TopupAccount setStep={setStep} setSubStep={setSubStep} setMyBalance={setMyBalance} balanceType="server" />}
            { step == 5 && subStep == 'deposit-success' && <DepositSuccess setStep={setStep} setSubStep={setSubStep} balanceType="server" /> }
            { step == 5 && subStep == 'deposit-fail' && <DepositFail setStep={setStep} setSubStep={setSubStep} balanceType="server" /> }
            { step == 6 && subStep == '' && <NodePreparation setStep={setStep} setSubStep={setSubStep} chooseChain={chooseChain} server={server} project={project} wallet={wallet} /> }
            { step == 7 && subStep == '' && <NodeInstall setStep={setStep} setSubStep={setSubStep} server={server} project={project} wallet={wallet} chain={chain} /> }
            { step == 7 && subStep == 'deposit-success' && <DepositSuccess setStep={setStep} setSubStep={setSubStep} balanceType="node-install" /> }
            { step== 7 && subStep == 'node-install-success' && <NodeSuccess /> }
            { step== 7 && subStep == 'stake-1' && <NodeRequirement1 /> }
            { step== 7 && subStep == 'stake-2' && <NodeRequirement2 /> }
            { step== 7 && subStep == 'stake-3' && <NodeRequirement3 /> }
            { step== 7 && subStep == 'stake-4' && <NodeRequirement4 /> }
        </div>
    )
}
export default WalletConnect

