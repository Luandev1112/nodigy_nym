import React, {useState, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Http from '../utils/Http';
import Header from '../common/Header';
import Footer from '../common/Footer';
import SuccessImage from '../assets/images/node-trans-congrats.png';
import ErrorModal from '../elements/ErrorModal';
import { apiUrl } from '../utils/urls';

const WalletSuccess = () => {
    const [balance, setBalance] = useState(0);
    const [amount, setAmount] = useState(0);
    const [step, setStep] = useState(0);
    const [subStep, setSubStep] = useState(0);
    const [nextUrl, setNextUrl] = useState('');
    const [prevUrl, setPrevUrl] = useState(''); 
    const [nodeId, setNodeId] = useState(0);
    const [projectId, setProjectId] = useState(0);
    const [serverId, setServerId] = useState(0);
    const [errorStatus, setErrorStatus] = useState(false);
    const [errorContent, setErrorContent] = useState("");

    const navigate = useNavigate();
    const gotoNextStep = () => {
        try {
            const formData = new FormData();
            formData.append('node_id', nodeId);
            formData.append('project_id', projectId);
            formData.append('server_id', serverId);
            const result = Http.post(apiUrl+'/api/wizard-setting-nym/node-installation-start', formData);
            formData.append('status', 'install');
            const nodeInstallationResult = Http.post(apiUrl+'/api/nym/set-installation-status', formData);
            navigate('/node-install');
        } catch (error) {
            setErrorStatus(true);
            setErrorContent("There is error in starting node installation");
        }
    }

    const getInitNode = async() => {
        let _initNode = await Http.get(apiUrl+'/api/nym/get-initial-node');
        const _nodeId = _initNode.data.node.id;
        setNodeId(_nodeId);
        const _projectId = _initNode.data.project.id;
        setProjectId(_projectId);
        const _serverId = _initNode.data.node.server_id;
        setServerId(_serverId);
    }

    useEffect(()=>{
        getInitNode();
    }, []); 
    return (
        <div className="steps">
            <Header setBalance={setBalance} myBalance={balance} step={7} />
            <div className="steps-content wallet-installation-success">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="borerbox border-0 bg-transparent ps-0">
                                <div className="items border-left border-down">
                                    <div className="p30">
                                        <div className="nod-center-text">
                                            <div className="icon"><img src={SuccessImage} /></div>
                                            <h3>Congratulations!</h3>
                                            <p>You've done great! Hope it was easy enough :)</p>
                                            <p>Let's set sails for the trip! We're ready to start the node installation. Press the Start button and take a break while we're preparing your node.</p>
                                        </div>
                                        <div className="btn-container">
                                            <a onClick={()=>gotoNextStep()} className="btn btn-new btn-primary">Start Installation</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ErrorModal errorContent={errorContent} status={errorStatus} />
            <Footer step={step} prevUrl={prevUrl} nextUrl={nextUrl} />
        </div>
    )
}
export default WalletSuccess;