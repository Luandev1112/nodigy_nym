import React, {useEffect, useState} from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import ProgressBar from '../common/ProgressBar';
import NYMImage from '../assets/images/nodes-logo-icon1.png';
import EditImage from '../assets/images/icon-edit-2.svg';
import EmptyWalletImage from '../assets/images/icon-empty-wallet.svg';
import RefreshImage from '../assets/images/icon-refresh-circle-white.svg';
const Stake = () => {
    const [balance, setBalance] = useState(0);
    const [test, setTest] = useState(false);

    const [step, setStep] = useState(8);
    const [subStep, setSubStep] = useState(0);
    const [nextUrl, setNextUrl] = useState('/stake-success');
    const [prevUrl, setPrevUrl] = useState('/node-installation-success'); 

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
                                        <div className="nod-red-text">
                                            <h4>Node requirements:</h4>
                                            <p>Min tokens amount: 500 $NYM</p>
                                            <p>Recommended tokens amount: 70 000 $NYM</p>
                                            <p>Gas fee paid in: $ETH</p>
                                            <p>You can buy NYM tokens on MEXC, OKX, Binance and Huobi</p>
                                            <p>Follow our <a href="">video</a> or <a href="">text guide</a></p>
                                        </div>

                                        <p> You can increase the amount tokens in your node by <a href="#">#bonding</a> more tokens or <a href="#">#delegating</a> into your node right in your wallet.
                                            Increase the amount of tokens to earn more via validating.
                                            Remember: your tokens will appear in your node in the next epoch (~ 1 hour).</p>
                                        {test && 
                                            <React.Fragment>
                                                <div className="nodeyourballance item border-left">
                                                    <div className="icon"><img src={EmptyWalletImage} /></div>
                                                    <div className="text">
                                                        <p><span>Your balance is 12.43 $NYM</span> Too low to stake</p>
                                                    </div>
                                                    <div className="action"><a href="#"><img src={RefreshImage} /></a></div>
                                                </div>
                                                <div className="n_r_form_field">
                                                    <p>85 485.56 $NYM <span>MAX</span></p>
                                                    <div className="form-group">
                                                        <span>$NYM</span>
                                                        <input type="text" className="form-control" value="10" />
                                                    </div>
                                                </div>
                                                <div className="btn-container">
                                                    <a href="#" className="btn btn-primary btn-buytoken">Buy tokens with fiat</a>
                                                    <a href="#" className="btn btn-primary btn-buytoken">Buy tokens with crypto</a>
                                                </div>
                                            </React.Fragment>
                                        }
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
export default Stake;