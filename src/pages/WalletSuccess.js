import React, {useState, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Http from '../utils/Http';
import Header from '../common/Header';
import Footer from '../common/Footer';
import ProgressBar from '../common/ProgressBar';
import SuccessImage from '../assets/images/node-trans-congrats.png';
import CopyImage from '../assets/images/icon-copy.svg';
const WalletSuccess = () => {
    const { state } = useLocation();
    const [hashId, setHashId] = useState(state?state.hashId:null);
    const [balanceType, setBalanceType] = useState(state?state.balanceType:null);
    const [balance, setBalance] = useState(0);
    const [amount, setAmount] = useState(0);
    const baseURL = 'http://localhost';
    const navigate = useNavigate();

    const gotoNextStep = () => {
        switch(balanceType) {
            case 'server':
                navigate('/wallet-install');
            break;
            case 'node-install':
                
            break;
        }
    }
    const getTransaction = async() => {
        const res = await Http.get(baseURL+'/api/getTransaction/'+hashId);
        setAmount(res.data.amount);
    }

    useEffect(()=>{
        getTransaction();
    }, []); 
    return (
        <div className="steps">
            <Header setBalance={setBalance} myBalance={balance} />
            <ProgressBar step={3} />
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
            <Footer />
        </div>
    )
}
export default WalletSuccess;