import React, {useEffect, useState} from 'react';
import { Button, Dropdown, Form, Modal } from 'react-bootstrap';
import Http from "../../utils/Http";
const NodePreparation = ({setStep, setSubStep, server, project, wallet, chooseChain}) => {

    console.log("server ::: ", server);
    console.log("project ::: ", project);
    console.log("wallet ::: ", wallet);
    

    const [poolId, setPoolId] = useState('');
    const [poolChain, setPoolChain] = useState('');
    const [chains, setChains] = useState([]);
    const [selectedChain, setSelectedChain] = useState(null);
    
    const handleInputChange = (e) => {
        e.preventDefault();
        // const inputData = e.target.value;
        // const inputName = e.taget.name;
        // setPoolId(inputData);
    }

    const shortenAddress = (address) => {
        let newString = address.substr(0 , 5) + "..." + address.substr(-5, 5);
        return newString;
    }

    const getChains = async () => {
        const res = await Http.get('/admin/api/getChainList');
        setChains(res.data.chains);
    }

    const selectChain = (idx) => {
        const _selectedChain = chains[idx];
        setSelectedChain(_selectedChain);
        setPoolId(_selectedChain.chain_id);
        chooseChain(_selectedChain);
    }

    useEffect(() => {
        getChains();
    }, []);
    return (
        <div className="steps-content nodeinstallation">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="borerbox border-0 bg-transparent ps-0">
                            <div className="items border-left border-down">
                                <div className="p30">
                                    <div className="title">Node Installation Preparing</div>
                                    <div className="item border-left">
                                        <div className="img"><img src="/images/nodes-logo-icon1.png" /></div>
                                        <div className="text">
                                            <div className="item-name"><a href="#">NYM node</a></div>
                                            <div className="item-text">
                                                <div className="whitetext">Wallet address: {shortenAddress(wallet.wallet_address)}</div>
                                                <div className="bluetext">{wallet.network_name} ({selectedChain?selectedChain.chain_name:""})</div>	
                                            </div>
                                        </div>
                                        <div className="action">
                                            <a href="#"><img src="/images/icon-edit-2.svg" /></a>
                                        </div>
                                    </div>
                                    
                                    <div className="node-prep-steps">
                                        <ul>
                                            <li>
                                                <div className="img"><img src="/images/node-prep-icon1.svg" /></div>
                                                <div className="text">
                                                    <p className="title">1. Hardware: CPU {server.vcpus} core; RAM {server.ram}; SSD {server.ssd} </p>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="img"><img src="/images/node-prep-icon2.svg" /></div>
                                                <div className="text">
                                                    <p className="title">2. Add scanner pool</p>
                                                    <p>Go to https://app.forta.network/ and follow our video guide</p>
                                                    <div className="image"><img src="/images/add-scanner-pool.png" /></div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="img"><img src="/images/node-prep-icon3.svg" /></div>
                                                <div className="text">
                                                    <p className="title">3. Enter pool details for my node</p>
                                                    <p>Go to https://app.forta.network/ and follow our video guide</p>
                                                </div>
                                            </li>
                                        </ul>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label>Pool ID</label>
                                                    <input type="text" className="form-control" value={poolId} onChange={handleInputChange} />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label>Pool chain</label>
                                                    <Dropdown className="dropdown-currency dropdown-poolchain">
                                                        <Dropdown.Toggle variant="default" id="dropdown-currency" className="btn btn-default">
                                                            {
                                                                selectedChain ?
                                                                <React.Fragment>
                                                                    <img src={"/images/chains/"+selectedChain.chain_logo} /> {selectedChain.chain_name}
                                                                    <span className="caret"></span>
                                                                </React.Fragment> :
                                                                <React.Fragment>
                                                                    <a>Pool chain</a>
                                                                    <span className="caret"></span>
                                                                </React.Fragment>
                                                            }
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu>
                                                        {
                                                            chains.length > 0 && chains.map((chain, i) => {
                                                                return(
                                                                    <li key={i}>
                                                                        <Dropdown.Item onClick={()=>selectChain(i)} ><img src={"/images/chains/"+chain.chain_logo}  /> { chain.chain_name }</Dropdown.Item>
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                        </Dropdown.Menu>
                                                    </Dropdown>

                                                </div>
                                            </div>
                                        </div>
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
export default NodePreparation;