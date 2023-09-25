import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import InstallImage from '../assets/images/icon-installation.png';
import CopyImage from '../assets/images/icon-copy.svg';
import CheckCircleImage from "../assets/images/icon-check-bullet.svg";
import Footer from '../common/Footer';
import { apiUrl, shortenAddress, shortenAddressString } from '../utils/script';
import Http from "../utils/Http";
import flagList from "../data/wallet/flagList.json";
import NymWallet from '../elements/NymWallet';
const NodeSuccess = () => {
    const { state } = useLocation();
    const [nodeId, setNodeId] = useState(state?state.nodeId:null);
    const [projectId, setProjectId] = useState(state?state.projectId:null);
    const [step, setStep] = useState(7);
    const [subStep, setSubStep] = useState(0);
    const [nextUrl, setNextUrl] = useState('');
    const [prevUrl, setPrevUrl] = useState(''); 
    const [copyContent, setCopyContent] = useState('');
    const [walletAddress, setWalletAddress] = useState('');
    const [idKey, setIdKey] = useState('');
    const [sphinxKey, setSphinxKey] = useState('');
    const [host, setHost] = useState('');
    const [version, setVersion] = useState('');
    const [mixPort, setMixPort] = useState('');
    const [country, setCountry] = useState('');
    const [nodeKey, setNodeKey] = useState('');

    const navigate = useNavigate();
    const gotoNextPage = () => {
        navigate('/stake', {
            state: {
                nodeId: nodeId
            }
        });
    }

    const copyLink = async(address, term) => {
        if(address != null && address != "") {
            setCopyContent(term);
            await navigator.clipboard.writeText(address);
        }
    }
    
    const getNodeDetail = async() => {   
        if(nodeId == null){
            return;
        }    

        const formData = new FormData();
        formData.append('node_id', nodeId);
        formData.append('project_id', projectId);
        const result = await Http.post(apiUrl+'/api/wizard-setting-nym/view', formData); 
        if(result.data.success){
            const nodeData = result.data.data;
            setWalletAddress(nodeData.wallet);
            setIdKey(nodeData.identity_key);
            setSphinxKey(nodeData.sphinx_key);
            setHost(nodeData.host_bind_address);
            setVersion(nodeData.version);
            setMixPort(nodeData.mix_port);
            setNodeKey(nodeData.signature_second_key);
            const countryKey = nodeData.country;
            if(countryKey && countryKey !== '')
            {
                setCountry(flagList[countryKey].country);
            }
        } else {
            console.log("There are some errors in installation");
        }  
    }

    useEffect(() => {
        if(nodeId && projectId) {
            getNodeDetail();
        }
    }, []);
    return (
        <div className="steps">
            <div className="steps-content nodeinstallation installation">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="borerbox border-0 bg-transparent ps-0">
                                <div className="items border-left border-down">
                                    <div className="p30">
                                        <div className="title">Installation</div>
                                        <div className="step-loader">
                                            <div className="img"><img src={InstallImage} /></div>
                                            <div className="text">Installation completed</div>
                                        </div>
                                        
                                        <NymWallet nodeId={nodeId} />

                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <tbody>
                                                    <tr>
                                                        <td>Identity Key:</td>
                                                        <td><span>{idKey}</span><a onClick={()=>copyLink(idKey, 'idkey')}> <img src={copyContent=='idkey'?CheckCircleImage:CopyImage} /></a></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Sphinx Key: </td>
                                                        <td><span>{sphinxKey}</span><a onClick={()=>copyLink(sphinxKey, 'sphinxKey')}> <img src={copyContent=='sphinxKey'?CheckCircleImage:CopyImage} /></a></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Host (bind address):</td>
                                                        <td><span>{host}</span><a onClick={()=>copyLink(host, 'host')}> <img src={copyContent=='host'?CheckCircleImage:CopyImage} /></a></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Version: </td>
                                                        <td><span>{version}</span><a onClick={()=>copyLink(version, 'version')}> <img src={copyContent=='version'?CheckCircleImage:CopyImage} /></a></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Mix Port:</td>
                                                        <td><span>{mixPort}</span><a onClick={()=>copyLink(mixPort, 'mixPort')}> <img src={copyContent=='mixPort'?CheckCircleImage:CopyImage} /></a></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Explorer:</td>
                                                        <td colSpan="2" className="text-center"><a href={"https://explorer.nymtech.net/network-components/mixnode/"+nodeId} className="fullurl">{"https://explorer.nymtech.net/network-components/mixnode/"+nodeId}</a></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Location:</td>
                                                        <td><span>{country}</span><a onClick={()=>copyLink(country, 'country')}> <img src={copyContent=='country'?CheckCircleImage:CopyImage} /></a></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Node Key:</td>
                                                        <td><span>{shortenAddressString(nodeKey, 36)}</span><a onClick={()=>copyLink(nodeKey, 'nodeKey')}> <img src={copyContent=='nodeKey'?CheckCircleImage:CopyImage} /></a></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="btn-container"><a onClick={gotoNextPage} className="btn btn-primary width100">Stake Tokens To My Node</a></div>
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
export default NodeSuccess;