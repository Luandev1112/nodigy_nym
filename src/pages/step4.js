import React from 'react';
import NYMImage from "../../assets/images/nym.png";
const Step4 = () => {
    return (
        <div className="steps-content step4">
            <div className="container">
                <div className="title">Investment token</div>
                <div className="borerbox">
                    <div className="items item1 border-left">
                        <div className="innerbox transparentbg">
                            <div className="box-img"><img src={NYMImage} /></div>
                            <div className="box-content">
                                <div className="text1">NYM</div>
                                <div className="text2"><span className="redtext">APY 7%</span><span className="bluetext">NYM (NYX Mainnet)</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="table">
                        <div className="t_row">
                            <div className="t_head">Network</div>
                            <div className="t_head">Token</div>
                        </div>
                        <div className="t_row">
                            <div className="t_column">
                                <div className="img"><img src={NYMImage} /></div>
                                <p><strong>Ethereum</strong> <span>0xd4C9S....9c2E8</span></p>
                            </div>
                            <div className="t_column">
                                <div className="price">0 NYM $0.00</div>
                            </div>
                        </div>
                        <div className="t_row">
                            <div className="t_column">
                                <div className="img"><img src={NYMImage} /></div>
                                <p><strong>Ethereum</strong> <span>0xd4C9S....9c2E8</span></p>
                            </div>
                            <div className="t_column">
                                <div className="price">0 NYM $0.00</div>
                            </div>
                        </div>
                    </div>
                    <div className="title2">Deposit by</div>
                    <div className="btn-container">
                        <a href="#" className="btn btn-primary">Fiat</a>
                        <a href="#" className="btn btn-default">Crypto</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Step4;