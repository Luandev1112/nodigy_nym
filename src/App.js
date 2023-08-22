import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Switch, Route} from 'react-router-dom';
import "./assets/scss/style.scss";
import ChooseServer from "./pages/ChooseServer";
import TopupAccount from './pages/TopupAccount';
import DepositSuccess from './pages/DepositSuccess';
import WalletInstall from './pages/WalletInstall';
import WalletSuccess from './pages/WalletSuccess';
import NodeInstall from './pages/NodeInstall';
import WalletBond from './pages/WalletBond';
import NodeSuccess from './pages/NodeSuccess';
import Stake from './pages/Stake';
import StakeSuccess from './pages/StakeSuccess';
import Login from './pages/Login';
import Register from './pages/Register';
const App = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [url, setUrl] = useState('');
    // const checkUser = async() => {
    //     try{
    //         const res = await Http.get('/admin/getuser');
    //         setIsLogin(true);
    //     }catch(err){
    //         const statusCode = err.response.status;
    //         if(statusCode == 401 || statusCode == 405)
    //         {
    //             window.location.href = "/logout";
    //         }
    //     }
    // }

    const setPath = (path) => {
        setUrl(path);
    }

    // checkUser();
    useEffect(()=>{
        // checkUser();
    }, [url]);
    return (
        <Router>
             <Routes>
                <Route path="/"  element={<ChooseServer />} />
                <Route path='/top-up-account' element={<TopupAccount />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/deposit-success' element={<DepositSuccess />} />
                <Route path='/wallet-install' element={<WalletInstall />} />
                <Route path='/wallet-installation-success' element={<WalletSuccess />} />
                <Route path='/node-install' element={<NodeInstall />} />
                <Route path='/bond-wallet' element={<WalletBond />} />
                <Route path='/node-installation-success' element={<NodeSuccess />} />
                <Route path='/stake' element={<Stake />} />
                <Route path='/stake-success' element={<StakeSuccess />} />
            </Routes>
        </Router>
    )
    
}
export default App
