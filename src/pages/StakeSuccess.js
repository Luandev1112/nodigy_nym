import React, {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import TransCongImage from '../assets/images/node-trans-congrats.png';
import { apiUrl } from '../utils/urls';

import Header from '../common/Header';
import Footer from '../common/Footer';
import NymWallet from '../elements/NymWallet';

const StakeSuccess = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [nodeId, setNodeId] = useState(searchParams.get('nodeId'));
    const [balance, setBalance] = useState(0);
    const [step, setStep] = useState(8);
    const [subStep, setSubStep] = useState(0);
    const [nextUrl, setNextUrl] = useState('');
    const [prevUrl, setPrevUrl] = useState(''); 
    useEffect(() => {
       console.log("useEffect");
    });
    return (
        <div className="steps">
            <Header setBalance={setBalance} myBalance={balance} step={8} />
            <div className="steps-content nodeinstallation">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="borerbox border-0 bg-transparent ps-0">
                                <div className="items border-left border-down">
                                    <div className="p30">
                                        <div className="nod-center-text">
                                            <div className="icon"><img src={TransCongImage} /></div>
                                            <h3>Congratulations!</h3>
                                            <p>Your node setup is completely done. <br />Tokens are staked.</p>
                                            <p>Please note: Newborn node needs some time to complete synchronization process. During that time node's status will be INACTIVE.<br />Update your node's name, description and logo, check your node's status and all information about your node in your <a href={apiUrl+"/admin/node/nym"}>personal area.</a></p>
                                        </div>
                                        <NymWallet nodeId={nodeId} />
                                        <div className="btn-container">
                                            <a href={apiUrl+"/admin/dashboard"} className="btn btn-primary width100">Go to Dashboard</a>
                                        </div>
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
export default StakeSuccess;