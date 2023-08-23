import React, {useEffect, useState} from 'react';

import TransCongImage from '../assets/images/node-trans-congrats.png';
import NYMImage from '../assets/images/nodes-logo-icon1.png';
import EditImage from '../assets/images/icon-edit-2.svg';
import EmptyWalletImage from '../assets/images/icon-empty-wallet.svg';
import RefreshImage from '../assets/images/icon-refresh-circle-white.svg';

import Header from '../common/Header';
import Footer from '../common/Footer';
import ProgressBar from '../common/ProgressBar';

const StakeSuccess = () => {
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
            <Header setBalance={setBalance} myBalance={balance} />
            <ProgressBar step={3} />
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
                                            <p>You can check your node status, all the parameters, stake, withdraw and claim rewards on the node’s page in your <a href="">personal area</a></p>
                                        </div>
                                        <div className="item border-left">
                                            <div className="img"><img src={NYMImage} /></div>
                                            <div className="text">
                                                <div className="item-name"><a href="#">NYM node</a></div>
                                                <div className="item-text">
                                                    <div className="whitetext">Wallet address: 0xdf...5yg8br</div>
                                                    <div className="bluetext">NYM (NYX Mainnet)</div>	
                                                </div>
                                            </div>
                                            <div className="action">
                                                <a href="#"><img src={EditImage} /></a>
                                            </div>
                                        </div>
                                        <div className="btn-container">
                                            <a href="#" className="btn btn-primary width100">Go to Dashboard</a>
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