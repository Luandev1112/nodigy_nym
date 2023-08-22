import React, {useState, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Http from '../utils/Http';
import Header from '../common/Header';
import Footer from '../common/Footer';
import ProgressBar from '../common/ProgressBar';
import SuccessImage from '../assets/images/node-trans-congrats.png';
import CopyImage from '../assets/images/icon-copy.svg';
const DepositSuccess = () => {
    const { state } = useLocation();
    const [hashId, setHashId] = useState(state?state.hashId:null);
    const [balanceType, setBalanceType] = useState(state?state.balanceType:null);
    const [amount, setAmount] = useState(null);
    const [balance, setBalance] = useState(0);
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
        amount &&
        <div className="steps">
            <Header setBalance={setBalance} myBalance={balance} />
            <ProgressBar step={3} />
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
                                                        <td className="text-right"><span className="whitetext">{hashId}</span><a href="#"> <img src={CopyImage} /></a></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Amount</td>
                                                        <td className="text-right"><span className="whitetext">{amount} USDT</span><a href="#"> <img src={CopyImage} /></a></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="btn-container">
                                            <a href="#" className="btn btn-gray">Download PDF</a>
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