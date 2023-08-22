import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Http from "../utils/Http";
import { Form, Dropdown } from 'react-bootstrap';
import CopyImage from "../assets/images/icon-copy.svg";

import Header from '../common/Header';
import Footer from '../common/Footer';
import ProgressBar from '../common/ProgressBar';

const ChooseServer = () => {
    const [servers, setServers] = useState([]);
    const [balance, setBalance] = useState(0);
    const [walletAddress, setWalletAddress] = useState('0x425BEde68e1bF2bD9f76432E5eA9e22BE71257a9');
    const [idKey, setIdKey] = useState('0x12ff65BC4c9818B0721fc23a79B1cDcE891cEa83');
    const [sphinxKey, setSphinxKey] = useState('0x12ff65BC4c9818B0721fc23a79B1cDcE891cEa83');
    const [host, setHost] = useState('5.161.53.14');
    const [version, setVersion] = useState('1.1.18');
    const [mixPort, setMixPort] = useState(8080);
    const [verlocPort, setVerlocPort] = useState(8090);
    const [httpPort, setHttpPort] = useState(5000);

    const shortenAddressString = (address, length) => {
        let newString = '';
        if(address.length > length){
            newString = address.substr(0 , length) + "...";   
        }else{
            newString = address;
        }
        return newString;
    }

    const baseURL = "http://localhost";
    const navigate = useNavigate();

    const getAllServers = async() => {
        const _servers = await Http.get(baseURL + '/admin/api/getAllServers');
        setServers(_servers.data);
    }

    const handleChange = () => {

    }

    useEffect(() => {
        getAllServers();
    }, []);
    return (
        <div className="steps">
            <Header setBalance={setBalance} myBalance={balance} />
            <ProgressBar step={3} />
            <div className="steps-content fullwidthcontainer fiatscreen step5">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-7">
                            <div className="borerbox">
                                <div className="p30">
                                    <h3>Bond your wallet with your node</h3>
                                    
                                    <div className="video-container">
                                        <video className="w-100" id="autoplay" muted playsInline controls loop>
                                            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                                            <source src="https://www.w3schools.com/html/mov_bbb.ogg" type="video/ogg" />
                                            Your browser does not support HTML video.
                                        </video>
                                    </div>

                                    <div className="bond-step mt-4">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="bond-step-1" />
                                            <label className="form-check-label" htmlFor="bond-step-1">
                                                1. Open your wallet and sign in. Use wallet address you connected to your node.
                                            </label>
                                        </div>

                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="bond-step-2" />
                                            <label className="form-check-label" htmlFor="bond-step-2">
                                                2. Navigate to Bonding --> Bond in your wallet and select Mixnode type.
                                            </label>
                                        </div>

                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="bond-step-3" />
                                            <label className="form-check-label" htmlFor="bond-step-3">
                                                3. Click “Show advanced options” in the popup in your wallet and copy data from the list above this text and paste into related fields in your wallet and click NEXT.
                                            </label>
                                        </div>

                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="bond-step-4" />
                                            <label className="form-check-label" htmlFor="bond-step-4">
                                                4. Copy message you received in your wallet and paste it in the field below:
                                            </label>
                                        </div>

                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="bond-step-5" />
                                            <label className="form-check-label" htmlFor="bond-step-5">
                                                5. Copy the signature and paste it in the related field in your wallet.
                                            </label>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-sm-5">
                            <div className="borerbox mt-5" style={{border:0, background:'transparent', paddingLeft:0}}>
                                <div className="items transferdetailsbox server-balance-block border-left">
                                    <div className="p-2">
                                        <h3>Data you will need:</h3>
                                        <div className="table-responsive node-info-table">
                                            <table className="table table-striped">
                                                <tbody>
                                                    <tr>
                                                        <td className="td-name">Use this wallet:</td>
                                                        <td className="text-end"><span>{shortenAddressString(walletAddress, 26)}</span><a href="#"> <img src={CopyImage} /></a></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="td-name">Identity Key: </td>
                                                        <td className="text-end"><span>{shortenAddressString(idKey, 26)}</span><a href="#"> <img src={CopyImage} /></a></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="td-name">Sphinx Key:</td>
                                                        <td className="text-end"><span>{shortenAddressString(sphinxKey, 26)}</span><a href="#"> <img src={CopyImage} /></a></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="td-name">Host (bind address): </td>
                                                        <td className="text-end"><span>{host}</span><a href="#"> <img src={CopyImage} /></a></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="td-name">Version:</td>
                                                        <td className="text-end"><span>{version}</span><a href="#"> <img src={CopyImage} /></a></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="td-name">Mix Port:</td>
                                                        <td className="text-end"><span>{mixPort}</span><a href="#"> <img src={CopyImage} /></a></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="td-name">Verloc port:</td>
                                                        <td className="text-end"><span>{verlocPort}</span><a href="#"> <img src={CopyImage} /></a></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="td-name">Http Port:</td>
                                                        <td className="text-end"><span>{httpPort}</span><a href="#"> <img src={CopyImage} /></a></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="mt-4 message-group">
                                            <h4>4. Copy message you received in your wallet and paste it in the field below:</h4>
                                            <div className="form-group mb-2">
                                                <textarea className="wallet-message"></textarea>
                                            </div>
                                            <a href="node-requirement1.html" className="btn btn-primary py-2">Submit</a>
                                        </div>

                                        <div className="btn-container"><a href="node-requirement1.html" className="btn btn-primary btn-gray width100">Finish node installation</a></div>
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
export default ChooseServer;