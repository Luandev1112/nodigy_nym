import React, {useState, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Http from '../utils/Http';
import Header from '../common/Header';
import Footer from '../common/Footer';
import SuccessImage from '../assets/images/node-trans-congrats.png';
import CopyImage from '../assets/images/icon-copy.svg';
import CheckCircleImage from "../assets/images/icon-check-bullet.svg";
import { apiUrl } from '../utils/script';
const DepositSuccess = () => {
    const { state } = useLocation();
    const [hashId, setHashId] = useState(state?state.hashId:null);
    const [balanceType, setBalanceType] = useState(state?state.balanceType:null);
    const [amount, setAmount] = useState(null);
    const [balance, setBalance] = useState(0);
    const [copyContent, setCopyContent] = useState('');

    const navigate = useNavigate();

    const gotoNextStep = () => {
        switch(balanceType) {
            case 'server':
                navigate('/wallet-identification');
            break;
            case 'node-install':
                
            break;
        }
    }
    const getTransaction = async() => {
        const res = await Http.get(apiUrl+'/api/getTransaction/'+hashId);
        setAmount(res.data.amount);
    }

    const copyLink = async(address, term) => {
        if(address != null && address != "") {
            setCopyContent(term);
            await navigator.clipboard.writeText(address);
        }
    }


    useEffect(()=>{
        getTransaction();
    }, []); 
    return (
        amount &&
        <div className="steps">
            <Header setBalance={setBalance} myBalance={balance} step={5} />
            <div className="steps-content nodeinstallation">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="borerbox border-0 bg-transparent ps-0">
                                <div className="items border-left border-down">
                                    <div className="p30">
                                        <div className="nod-center-text">
                                            <div className="icon"><img src={SuccessImage} /></div>
                                            <h3>Congratulations!</h3>
                                            <p>This invoice will be available in transaction history <br /> in your personal area</p>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table table-striped" style={{maxWidth: '560px', margin: '0 auto 40px'}}>
                                                <tbody>
                                                    <tr>
                                                        <td>Payment ID:</td>
                                                        <td className="text-right"><span className="whitetext">{hashId}</span><a onClick={()=>copyLink(hashId, 'payment_id')}> <img src={copyContent=='payment_id'?CheckCircleImage:CopyImage} /></a></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Amount</td>
                                                        <td className="text-right"><span className="whitetext">{amount} USDT</span><a onClick={()=>copyLink(amount, 'amount')}> <img src={copyContent=='amount'?CheckCircleImage:CopyImage} /></a></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="btn-container">
                                            <a className="btn btn-gray btn-new btn-commingsoon">Download PDF</a>
                                            <a onClick={()=>gotoNextStep()} className="btn btn-primary">Next</a>
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
export default DepositSuccess;