import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Http from "../utils/Http";
import CopyImage from "../assets/images/icon-copy.svg";
import Header from '../common/Header';
import Footer from '../common/Footer';
import ProgressBar from '../common/ProgressBar';
import { apiUrl } from "../utils/script";

const ChooseServer = () => {
    const [node, setNode] = useState(0);
    const [balance, setBalance] = useState(0);
    const [walletAddress, setWalletAddress] = useState('');
    const [idKey, setIdKey] = useState('');
    const [sphinxKey, setSphinxKey] = useState('');
    const [host, setHost] = useState('');
    const [version, setVersion] = useState('');
    const [mixPort, setMixPort] = useState();
    const [verlocPort, setVerlocPort] = useState();
    const [httpPort, setHttpPort] = useState();
    const [signatureWallet, setSignatureWallet] = useState('');
    const [intervalSecond, setIntervalSecond] = useState(0);
    const [step1, setStep1] = useState(false);
    const [step2, setStep2] = useState(false);
    const [step3, setStep3] = useState(false);
    const [step4, setStep4] = useState(false);
    const [step5, setStep5] = useState(false);
    const [messageText, setMessageText] = useState('');
    const [messageClass, setMessageClass] = useState('btn-gray');
    const [finishClass, setFinishClass] = useState('btn-gray');
    const [step, setStep] = useState(5);
    const [subStep, setSubStep] = useState(0);
    const [nextUrl, setNextUrl] = useState('');
    const [prevUrl, setPrevUrl] = useState('/wallet-install'); 

    const shortenAddressString = (address, length) => {
        let newString = '';
        if(address.length > length){
            newString = address.substr(0 , length) + "...";   
        }else{
            newString = address;
        }
        return newString;
    }

    const navigate = useNavigate();
    const handleChange = (e) => {
        // e.preventDefault();
        const name = e.target.name;
        switch(name){
            case 'step1':
                setStep1(true);    
            break;
            case 'step2':
                setStep2(true);    
            break;
            case 'step3':
                setStep3(true);    
            break;
            case 'step4':
                setStep4(true);    
            break;
            case 'step5':
                // setStep5(true);    
            break;
            case 'message':
                const _value = e.target.value;
                setMessageText(_value);
                if(_value.length > 0) {
                    setMessageClass('');
                }
            break;
        }
    }

    const messageSubmit = async() => {
        if(messageText.length > 0 && node != null)
        {
            setStep5(true);
            const formData = new FormData();
            formData.append('node_id', node.id);
            formData.append('signature_message', messageText);
            const result = await Http.post(apiUrl+'/api/wizard-setting-nym/add-first-signature', formData);
            console.log(result);
        }
    }

    const gotoNextPage = async() => {
        if(finishClass == '')
        {
            const formData = new FormData();
            formData.append('node_id', node.id);
            formData.append('node_status', 1);
            const result = await Http.post(apiUrl+'/api/set-node-status', formData);
            navigate('/node-installation-success');
        }
    }

    const conpyLink = async(address) => {
        if(address != "") {
            await navigator.clipboard.writeText(address);
        }
    }

    const getInitNode = async() => {
        let _initNodeResult = await Http.get(apiUrl+'/api/getInitialNode');
        if(_initNodeResult.data.status == 1) {
            const _node = _initNodeResult.data.node;
            if(_node != null){
                setNode(_node);
                const formData = new FormData();
                formData.append('project_id', _node.project_id);
                formData.append('node_id', _node.id);
                const _statusResult = await Http.post(apiUrl+'/api/wizard-setting-nym/view', formData); 
                if(_statusResult.data.success){
                    const installationData = _statusResult.data.data;
                    console.log("Installation Data: ", installationData);
                    setWalletAddress(installationData.wallet);
                    setIdKey(installationData.identity_key);
                    setSphinxKey(installationData.sphinx_key);
                    setHost(installationData.host_bind_address);
                    setVersion(installationData.version);
                    setMixPort(installationData.mix_port);
                    setVerlocPort(installationData.verloc_port);
                    setHttpPort(installationData.http_port);
                } else {
                    console.log("There are some errors in installation");
                }  
            }
        }else{

        }
    }

    const getInstallationStatus = async() => {
        try {
            if(node != null){
                const formData = new FormData();
                formData.append('project_id', node.project_id);
                formData.append('node_id', node.id);
                const _statusResult = await Http.post(apiUrl+'/api/wizard-setting-nym/view', formData); 
                if(_statusResult.data.success){
                    const installationData = _statusResult.data.data;
                    const fullStep = installationData.full_step;
                    const prevStep = installationData.previous_succesfull_step;
                    const stepDescription = installationData.step_description;
        
                    if(fullStep == prevStep) {
                        setSignatureWallet(installationData.signature_second_key);
                        setFinishClass('');
                    }
                } else {
                    console.log("There are some errors in installation");
                }  
            }
        } catch (error) {
            console.log("Exception error: ", error);
        }
        setTimeout(() => {
            setIntervalSecond(intervalSecond + 1);
        }, 10000);
    }

    useEffect(() => {
        getInitNode();
    }, []);

    useEffect(() => {
        getInstallationStatus();

    }, [intervalSecond]);
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
                                            <input className="form-check-input" type="checkbox" name="step1" checked={step1} onChange={handleChange} id="bond-step-1" />
                                            <label className="form-check-label" htmlFor="bond-step-1">
                                                1. Open your wallet and sign in. Use wallet address you connected to your node.
                                            </label>
                                        </div>

                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" name="step2" checked={step2} onChange={handleChange} id="bond-step-2" />
                                            <label className="form-check-label" htmlFor="bond-step-2">
                                                2. Navigate to Bonding --> Bond in your wallet and select Mixnode type.
                                            </label>
                                        </div>

                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" name="step3" checked={step3} onChange={handleChange} id="bond-step-3" />
                                            <label className="form-check-label" htmlFor="bond-step-3">
                                                3. Click “Show advanced options” in the popup in your wallet and copy data from the list above this text and paste into related fields in your wallet and click NEXT.
                                            </label>
                                        </div>

                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" name="step4" checked={step4} onChange={handleChange} id="bond-step-4" />
                                            <label className="form-check-label" htmlFor="bond-step-4">
                                                4. Copy message you received in your wallet and paste it in the field below:
                                            </label>
                                        </div>

                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" name="step5" checked={step5} onChange={handleChange} id="bond-step-5" />
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
                                                        <td className="text-end"><span>{shortenAddressString(walletAddress, 26)}</span><a onClick={()=>conpyLink(walletAddress)}> <img src={CopyImage} /></a></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="td-name">Identity Key: </td>
                                                        <td className="text-end"><span>{shortenAddressString(idKey, 26)}</span><a onClick={()=>conpyLink(idKey)}> <img src={CopyImage} /></a></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="td-name">Sphinx Key:</td>
                                                        <td className="text-end"><span>{shortenAddressString(sphinxKey, 26)}</span><a onClick={()=>conpyLink(sphinxKey)}> <img src={CopyImage} /></a></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="td-name">Host (bind address): </td>
                                                        <td className="text-end"><span>{host}</span><a onClick={()=>conpyLink(host)}> <img src={CopyImage} /></a></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="td-name">Version:</td>
                                                        <td className="text-end"><span>{version}</span><a onClick={()=>conpyLink(version)}> <img src={CopyImage} /></a></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="td-name">Mix Port:</td>
                                                        <td className="text-end"><span>{mixPort}</span><a onClick={()=>conpyLink(mixPort)}> <img src={CopyImage} /></a></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="td-name">Verloc port:</td>
                                                        <td className="text-end"><span>{verlocPort}</span><a onClick={()=>conpyLink(verlocPort)}> <img src={CopyImage} /></a></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="td-name">Http Port:</td>
                                                        <td className="text-end"><span>{httpPort}</span><a onClick={()=>conpyLink(httpPort)}> <img src={CopyImage} /></a></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="mt-4 message-group">
                                            <h4>4. Copy message you received in your wallet and paste it in the field below:</h4>
                                            <div className="form-group mb-2">
                                                <textarea className="wallet-message" name="message" onChange={handleChange} value={messageText} />
                                            </div>
                                            <a onClick={messageSubmit} className={"btn btn-primary py-2 "+messageClass}>Submit</a>
                                        </div>

                                        <div className="mt-4 signature-group">
                                            <h4>5. Copy signature and paste in in the related field in your wallet:</h4>
                                            <table className="table table-striped">
                                                <tbody>
                                                    <tr>
                                                        <td className="td-name">Signature:</td>
                                                        <td className="text-end"><span>{shortenAddressString(signatureWallet, 26)}</span>
                                                        {
                                                            shortenAddressString(signatureWallet, 26) != '' && <a onClick={()=>conpyLink(signatureWallet)} > <img src={CopyImage} /></a>
                                                        }
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="btn-container"><a onClick={gotoNextPage} className={"btn btn-primary width100 "+finishClass}>Finish node installation</a></div>
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
export default ChooseServer;