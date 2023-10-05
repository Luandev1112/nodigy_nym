import React, {useEffect, useState} from 'react';
import NYMImage from '../assets/images/nodes-logo-icon1.png';
import EditImage from '../assets/images/icon-edit-2.svg';
import SaveCircleImage from "../assets/images/icon-check-bullet-bluebg.svg";
import CloseImage from "../assets/images/icon-line-close-black.png";
import { apiUrl, shortenAddress, shortenAddressString } from '../utils/script';
import Http from "../utils/Http";

const NymWallet = ({nodeId}) => {

    const [nameEditStatus, setNameEditStatus] = useState(false);
    const [nodeName, setNodeName] = useState('');
    const [nodeNameTemp, setNodeNameTemp] = useState('');
    const [walletAddress, setWalletAddress] = useState('');

    const closeNodeNameEdit  = () => {
        console.log("Node temp name: ", )
        setNodeName(nodeNameTemp);
        setNameEditStatus(false);
    }

    const handleInputChange = (e) => {
        e.preventDefault();
        const _nameValue = e.target.value;
        setNodeName(_nameValue);
    }

    const changeNodeName = async() => {
        if(nameEditStatus){
            const formData = new FormData();
            formData.append('node_id', nodeId);
            formData.append('node_name', nodeName);
            const result = await Http.post(apiUrl+'/api/nym/update-node-name', formData);
            if(result.data.status == 1) {
                setNameEditStatus(false);
            }
        }else{
            setNameEditStatus(true);
            setNodeNameTemp(nodeName);
        }
    }

    const getNode = async() => {
        const nodeForm = new FormData();
        nodeForm.append('node_id', nodeId);
        const nodeResult = await Http.post(apiUrl+'/api/nym/node-info', nodeForm);
        console.log("Node data status: ", nodeResult.data);
        if(nodeResult.data.status == 1){
            const _node = nodeResult.data.node;
            const _nodeName = _node.node_name;
            const _walletAddress = _node.node_wallet;
            setWalletAddress(_walletAddress);
            setNodeName(_nodeName);
            setNodeNameTemp(_nodeName);
        }
    }

    useEffect(()=>{
        getNode();
    }, []);
    return (
        <div className="item border-left">
            <div className="img"><img src={NYMImage} /></div>
            <div className="text">
                <div className="item-name">
                {nameEditStatus?
                    <React.Fragment>
                        <input name="node_name" onChange={handleInputChange} value={nodeName}  />
                        <a onClick={()=>closeNodeNameEdit()}><img src={CloseImage} /></a>
                    </React.Fragment> :
                    <a>{nodeName}</a>
                }
                </div>
                <div className="item-text">
                    <div className="whitetext">Wallet address: {shortenAddress(walletAddress)}</div>
                    <div className="bluetext">NYM (NYX Mainnet)</div>	
                </div>
            </div>
            {/* <div className="action"> */}
                
            {/* </div> */}
            <div className="action">
                <a onClick={()=>changeNodeName()}><img src={nameEditStatus?SaveCircleImage:EditImage} /></a>
            </div>
        </div>
    )
}
export default NymWallet;