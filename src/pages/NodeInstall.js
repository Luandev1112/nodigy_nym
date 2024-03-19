import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Http from "../utils/Http";
import NodeImage from "../assets/images/nodes-logo-icon1.png";
import EditImage from "../assets/images/icon-edit-2.svg";
import Header from '../common/Header';
import Footer from '../common/Footer';
import NymWallet from '../elements/NymWallet';
import {CircularProgressbar} from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";
import { shortenAddress } from '../utils/script';
import { apiUrl } from '../utils/urls';
const NodeInstall = () => {
    const [walletAddress, setWalletAddress] = useState("");
    const [balance, setBalance] = useState(0);
    const [serverId, setServerId] = useState(0);
    const [intervalSecond, setIntervalSecond] = useState(0);
    const [percentage, setPercetage] = useState(0);
    const [node, setNode] = useState(null);
    const [installTitle, setInstallTitle] = useState("Installation in progress");
    const [installDescription, setInstallDescription] = useState('The installation process may take some time');
    const navigate = useNavigate();

    const getWalletAddress = async() => {
        const formData = new FormData();
        formData.append('project_name', 'NYM');
        const res = await Http.post(apiUrl + "/api/nym/get-node-wallet", formData);
        const _walletAddress = res.data.wallet;
        setWalletAddress(_walletAddress);
    }

    const getInstallationStatus = async() => {
        try {
            if(node != null && walletAddress != ''){
                let _percentage = 0;
                const formData = new FormData();
                formData.append('project_id', node.project_id);
                formData.append('node_id', node.id);
                const _statusResult = await Http.post(apiUrl+'/api/wizard-setting-nym/view', formData); 
                if(_statusResult.data.success){
                    const installationData = _statusResult.data.data;
                    const fullStep = installationData.full_step;
                    const prevStep = installationData.previous_succesfull_step;
                    const stepDescription = installationData.step_description;
                    setInstallDescription(stepDescription);
                    _percentage = parseInt(prevStep*10000/fullStep) / 100 ; 
                    setPercetage(_percentage);

                    if (prevStep == 7)
                    {
                        const formData = new FormData();
                        formData.append('node_id', node.id);
                        formData.append('status', 'signature');
                        const nodeInstallationResult = Http.post(apiUrl+'/api/nym/set-installation-status', formData);
                        setInstallTitle("Installation successful");
                        setTimeout(() => {
                            navigate('/bond-wallet');
                        }, 3000);
                    }
                } else {
                    console.log("There are some errors in installation");
                }  
            }
        } catch (error) {
            console.log("Exception error: ", error);
        }
        setTimeout(() => {
            setIntervalSecond(intervalSecond + 1);
        }, 10000);
    }

    const getInitNode = async() => {
        let _initNode = await Http.get(apiUrl+'/api/nym/get-initial-node');
        setNode(_initNode.data.node);
        const _serverId = _initNode.data.node.server_id;
        setServerId(_serverId);
    }

    useEffect(() => {
        getWalletAddress();
        getInitNode();
    }, []);

    useEffect(() => {
        getInstallationStatus();

    }, [intervalSecond]);
    return (
        <div className="steps">
            <Header setBalance={setBalance} myBalance={balance} step={7} />
            <div className="steps-content nodeinstallation">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="borerbox border-0 bg-transparent ps-0">
                                <div className="items border-left border-down">
                                    <div className="p30">
                                        <div className="title">Node Installation</div>
                                        <div className="step-loader">
                                            <div className="node-install-progress mx-auto">
                                                <CircularProgressbar
                                                    className="node-install-progressbar"
                                                    value={percentage}
                                                    // Path width must be customized with strokeWidth,
                                                    // since it informs dimension calculations.
                                                    strokeWidth={5}
                                                    background={false}
                                                    // You can override styles either by specifying this "styles" prop,
                                                    // or by overriding the default CSS here:
                                                    // https://github.com/iqnivek/react-circular-progressbar/blob/master/src/styles.css
                                                    styles={{
                                                        // Customize the root svg element
                                                        root: {},
                                                        // Customize the path, i.e. the part that's "complete"
                                                        path: {
                                                        // Tweak path color:
                                                        stroke: '#23b365',
                                                        // Tweak path to use flat or rounded ends:
                                                        strokeLinecap: 'round',
                                                        // Tweak transition animation:
                                                        transition: 'stroke-dashoffset 0.5s ease 0s',
                                                        },
                                                        // Customize the circle behind the path
                                                        trail: {
                                                            // Tweak the trail color:
                                                            stroke: 'transparent',
                                                        },
                                                        // Customize the text
                                                        // text: {
                                                        // // Tweak text color:
                                                        // fill: '#f88',
                                                        // // Tweak text size:
                                                        // fontSize: '30px',
                                                        // },
                                                    }}
                                                />
                                            </div>
                                            <div className="text">{installTitle}</div>
                                            <p className="graytext">{installDescription}</p>
                                        </div>
                                        {node && <NymWallet nodeId={node.id} /> }
                                        <p className="graytext">The installation process may take up to an hour. You can close this window. We will notify you when the installation is finished and send you a link to complete the last steps. You can track progress also in your <a href={apiUrl+"/admin/node/NYM"}>personal area.</a></p>
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