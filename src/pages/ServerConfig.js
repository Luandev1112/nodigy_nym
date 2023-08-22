import React, {useEffect, useState} from 'react';


const ServerConfig = ({setStep, setSubStep}) => {
    const gotoTopupPage = () => {
        setSubStep('topup');
        setStep(5);
    }
    return (
        <div className="steps-content fullwidthcontainer fiatscreen step5">
            <div className="container">
                <div className="row">
                    <div className="col-sm-7">
                        <div className="borerbox">
                            <div className="p30">
                                <h3>Choose server configuration</h3>
                                
                                <div className="server_table table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>VCPUS</th>
                                                <th>RAM</th>
                                                <th>SSD</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="graytext">1</td>
                                                <td>Minimum required</td>
                                                <td><span><img src="/images/icon-vspus.svg" /> 1 Intel</span></td>
                                                <td className="graytext">2 GB</td>
                                                <td><span><img src="/images/icon-storage.svg" /> 16 GB</span></td>
                                            </tr>
                                            <tr>
                                                <td className="graytext">2</td>
                                                <td>Recommended</td>
                                                <td><span><img src="/images/icon-vspus-black.svg" /> 2 Intel</span></td>
                                                <td className="graytext">4 GB</td>
                                                <td><span><img src="/images/icon-storage-black.svg" /> 32 GB</span></td>
                                            </tr>
                                            <tr>
                                                <td className="graytext">3</td>
                                                <td>Max performance</td>
                                                <td><span><img src="/images/icon-vspus.svg" /> 4 Intel</span></td>
                                                <td className="graytext">8 GB</td>
                                                <td><span><img src="/images/icon-storage.svg" /> 64 GB</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="blueboxtext"><p>Minimum required server configuration means fewer rewards, but also lower monthly payments. The maximized configuration will increase the charge, but you'll also get from validating the most. Recommended parameters option exists to balance things out.</p></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-5">
                        <div className="borerbox border-0 bg-transparent ps-0">
                            <div className="items transferdetailsbox server-balance-block border-left">
                                <div className="title">My Balance <span>12 $USDT</span></div>
                                <h4>Payment details</h4>
                                <div className="row">
                                    <label className="col-sm-8">One-time onboarding fee</label>
                                    <p className="col-sm-4">20 $USDT</p>
                                </div>
                                <div className="totalrow">
                                    <div className="row">
                                        <label className="col-sm-8">Total</label>
                                        <p className="col-sm-4">20 $USDT</p>
                                    </div>
                                </div>
                                <div className="insufficientbalance">Your balance has insufficient funds</div>
                                <div className="btn-container">
                                    <a onClick={()=>gotoTopupPage()} className="btn btn-gray">Complete Payment</a>
                                </div>
                            </div>
                        </div>
                        <p className="whitetext">Feel free to contact our support for any possible questions:</p>
                        <div className="f-c-d-support">
                            <div className="email">
                                <a href="#">support@nodigy.com</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ServerConfig;