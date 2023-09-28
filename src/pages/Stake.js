import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Header from '../common/Header';
import Footer from '../common/Footer';
import ProgressBar from '../common/ProgressBar';
import NymWallet from '../elements/NymWallet';
const Stake = () => {
    const { state } = useLocation();
    const [nodeId, setNodeId] = useState(state?state.nodeId:null);
    const [balance, setBalance] = useState(0);
    const [step, setStep] = useState(8);
    const [subStep, setSubStep] = useState(0);
    const [nextUrl, setNextUrl] = useState('/stake-success');
    const [prevUrl, setPrevUrl] = useState('/node-installation-success'); 

    const navigate = useNavigate();

    const handleStep = async() => {
        navigate(nextUrl, {
            state: {
                nodeId: nodeId
            }
        })   
    }

    useEffect(() => {
    }, []);
    return (
        <div className="steps">
            <Header setBalance={setBalance} myBalance={balance} step={3} />
            <div className="steps-content nodeinstallation">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="borerbox border-0 bg-transparent ps-0">
                                <div className="items border-left border-down">
                                    <div className="p30">
                                        <NymWallet nodeId={nodeId} />
                                        <div className="nod-red-text">
                                            <h4>Node requirements:</h4>
                                            <p>Min tokens amount: 100 $NYM</p>
                                            <p>Recommended tokens amount: 30 000 $NYM or more</p>
                                            <p>Gas fee paid in: $NYM</p>
                                            <p>$NYM tokens are available for purchase on Kraken, Mexc, OKX, or Huobi exchanges.</p>
                                            <p>Follow our text <a href="https://docs.nodigy.com/welcome/guides-and-instructions/wallet-installation-guides/nym-wallet#top-up-your-account" target="_blank">guide</a>.</p>
                                        </div>

                                        <p>You can increase the staked tokens amount by bonding or delegating them into your node inside your NYM wallet. Read more <a href="https://docs.nodigy.com/welcome/guides-and-instructions/staking-and-rewards/nym-bonding-delegating-and-rewards" className="green_text" target="_blank">here</a>.</p>
                                        <p>Increase your node saturation to earn more significant rewards.</p>
                                        <p>Remember: Tokens will appear in your node in the next epoch (~ 1 hour).</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer step={step} prevUrl={prevUrl} nextUrl={nextUrl} handleStep={handleStep} />
        </div>
    )
}
export default Stake;