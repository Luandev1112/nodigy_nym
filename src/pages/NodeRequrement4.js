import React, {useEffect, useState} from 'react';
const NodeRequirement4 = () => {
    useEffect(() => {
       console.log("useEffect");
    });
    return (
        <div className="steps-content nodeinstallation">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="borerbox border-0 bg-transparent ps-0">
                            <div className="items border-left border-down">
                                <div className="p30">
                                    <div className="nod-center-text">
                                        <div className="icon"><img src="/images/node-trans-failed.png" /></div>
                                        <h3>Transaction failed</h3>
                                        <p>Please make sure that your amount is greater than the minimum node requirement and try again.</p>
                                    </div>
                                    <div className="item border-left">
                                        <div className="img"><img src="/images/nodes-logo-icon1.png" /></div>
                                        <div className="text">
                                            <div className="item-name"><a href="#">NYM node</a></div>
                                            <div className="item-text">
                                                <div className="whitetext">Wallet address: 0xdf...5yg8br</div>
                                                <div className="bluetext">NYM (NYX Mainnet)</div>	
                                            </div>
                                        </div>
                                        <div className="action">
                                            <a href="#"><img src="/images/icon-edit-2.svg" /></a>
                                        </div>
                                    </div>
                                    <div className="btn-container">
                                        <a href="#" className="btn btn-primary width100">Back to Stake</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
export default NodeRequirement4;