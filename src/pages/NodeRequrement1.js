import React, {useEffect, useState} from 'react';
const NodeRequirement1 = () => {
    const [depositValue, setDepositValue] = useState(10);
    const handleInputChange = (e) => {
        e.preventDefault();
        const targetName = e.target.name;
        const targetValue = e.target.value;
        setDepositValue(targetValue);
    }
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
                                    <div className="nod-red-text">
                                        <h4>Node requirements:</h4>
                                        <p>Min tokens amount: 500 $NYM</p>
                                        <p>Recommended tokens amount: 70 000 $NYM</p>
                                        <p>Gas fee paid in: $ETH</p>
                                    </div>
                                    <div className="n_r_form_field">
                                        <p>85 485.56 $NYM <span>MAX</span></p>
                                        <div className="form-group">
                                            <span>$NYM</span>
                                            <input type="text" className="form-control" value={depositValue} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="btn-container">
                                        <a href="#" className="btn btn-primary btn-buytoken">Buy tokens with crypto</a>
                                        <a href="#" className="btn btn-primary">Stake</a>
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
export default NodeRequirement1;