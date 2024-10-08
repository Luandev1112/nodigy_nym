import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Http from "../utils/Http";
import { Form, Dropdown } from 'react-bootstrap';
import flagList from "../data/wallet/flagList.json";
import coreTypes from "../data/wallet/coreTypes.json";
import Header from '../common/Header';
import Footer from '../common/Footer';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorModal from '../elements/ErrorModal';
import { apiUrl, web3APIUrl } from '../utils/urls';

const ChooseServer = () => {
    const { state } = useLocation();
    const [selectedId, setSelectedId] = useState(0);
    const [limitBalance, setLimitBalance] = useState(0);
    const [selectedServer, setSelectedServer] = useState(null);
    const [servers, setServers] = useState([]);
    const [project, setProject] = useState(null);
    const [onbordingFee, setOnbordingFee] = useState(0);
    const [monthlyPrice, setMonthlyPrice] = useState(0);
    // const [dataCenters, setDataCenter] = useState(['Hetzner']);
    // const [selectedDataCenter, setSelectedDataCenter] = useState(0);
    const [selectedLocationIndex, setSelectedLocationIndex] = useState(-1);
    const [balance, setBalance] = useState(0);
    const [step, setStep] = useState(3);
    const [subStep, setSubStep] = useState(0);
    const [nextUrl, setNextUrl] = useState('');
    const [prevUrl, setPrevUrl] = useState(apiUrl+'/admin/wallet-connect'); 
    const [exchangeRate, setExchangeRate] = useState(1);
    const [serverLocations, setServerLocations] = useState([]);
    const [locations, setLocations] = useState([]);
    const [loadingStatus, setLoadingStatus] = useState(false);
    const [balanceStatus, setBalanceStatus] = useState(false);
    const [gasFee, setGasFee] = useState(2);
    const [paymentBtnText, setPaymentBtnText] = useState("Complete Payment");
    const [errorStatus, setErrorStatus] = useState(false);
    const [errorContent, setErrorContent] = useState("");

    const navigate = useNavigate();

    const selectServer = (idx) => {
        const _selectedServer = servers[idx];
        console.log("Selected Server: => ", _selectedServer);
        setSelectedServer(_selectedServer);
        setSelectedId(_selectedServer.id);
        const _price = Number((_selectedServer.price_monthly_gross * exchangeRate).toFixed(2));
        const _limitBalance = getServerSelectionFee(_price);

        let _balanceStatus = false;
        if(_price == 0) {
            _balanceStatus = false;
        }else{
            _balanceStatus = true;
            if(balance >= _limitBalance) {
                setPaymentBtnText("Complete Payment");
            } else{
                setPaymentBtnText("Top-up account");
            }
        }
        setBalanceStatus(_balanceStatus);
    }

    const getServerSelectionFee = (serverMonthlyPrice) => {
        const currentDate = new Date();
        const _currentYear = currentDate.getFullYear();
        const _currentMonth = currentDate.getMonth();
        const _currentDay = currentDate.getDate();
        const _lastMonthDate = new Date(_currentYear, _currentMonth+1, 0);
        const _lastMonthDay = _lastMonthDate.getDate();

        const _serverCurrentPrice = Number( ((_lastMonthDay - _currentDay) * serverMonthlyPrice / _lastMonthDay).toFixed(2) );
        setMonthlyPrice(_serverCurrentPrice);
        
        const _limitBalance = Number((onbordingFee*1 + _serverCurrentPrice + gasFee).toFixed(2));
        setLimitBalance(_limitBalance);
        return _limitBalance;
    } 

    const gotoTopupPage = async() => {
        if(balanceStatus) {
            if(balance >= limitBalance){
                try {
                    setLoadingStatus(true);
                    const userResult = await Http.get(apiUrl + "/api/user");
                    if(userResult.data.success)
                    {
                        const token = userResult.data.data.token;
                        const additionalUrl = 'amount='+limitBalance+'&token='+token;
                        const purchaseResult = await Http.get(web3APIUrl+'/purchase-server?'+additionalUrl);
                        if(purchaseResult.data.result == 1) {
                            let formData = new FormData();
                            formData.append('transaction_id', purchaseResult.data.transaction.id);
                            formData.append('price', limitBalance);
                            const result = await Http.post(apiUrl + '/api/nym/purchase-server', formData);
            
                            const userBalance = result.data.user_balance;
                            setBalance(userBalance);
                            const hashId = result.data.transaction.txn_id;

                            const _nodeId = result.data.node.id;
                            const _projectId = result.data.node.project_id;
                            const _locationId = locations[selectedLocationIndex].id;
                            const _serverType = selectedServer.type;
                            const _serverTypeId = selectedServer.server_type_id;
                            
                            const serverData = new FormData();
                            serverData.append('project_id', _projectId);
                            serverData.append('node_id', _nodeId);
                            serverData.append('location_id', _locationId);
                            serverData.append('server_type_id', _serverTypeId);
                            serverData.append('data_center_type', _serverType);
                            const createServerResult = await Http.post(apiUrl + '/api/wizard-setting-nym/create-server', serverData);
                            console.log("Create server result", createServerResult);
            
                            const _createdServer = createServerResult.data.data.server;
                            console.log("_created server: ", _createdServer);
                            if(_createdServer){
                                const _serverId = _createdServer.id;
                                console.log("server id",_serverId);
                                formData = new FormData();
                                formData.append('server_id', _serverId);
                                formData.append('node_id', _nodeId);
                                const saveResult = await Http.post(apiUrl + '/api/nym/save-server-id', formData);
                                if(saveResult.data){
                                    navigate('/deposit-success', {
                                        state: {
                                            hashId: hashId,
                                            balanceType: 'server'
                                        }
                                    });
                                }
                            }
                        }
                    }
                    setLoadingStatus(false);

                } catch (error) {
                    console.log(error);
                    setLoadingStatus(false);
                }
                
            }else{
                navigate('/top-up-account');
            }
        }
    }

    const getEuroRate = async() => {
        try {
            const _exchangeRate = await Http.get(apiUrl + '/api/convert-price/get-exchange-rate/euro');
            setExchangeRate(_exchangeRate.data.data.rate);   
        } catch (error) {
            setErrorStatus(true);
            setErrorContent("There is error in geting rate");
        }
    }

    const getServers = async() => {
        try {
            let _projectId = 0;
            const _projectResult = await Http.get(apiUrl + '/api/project/detail/NYM');
            if(_projectResult.data.status == 1)
            {
                _projectId = _projectResult.data.project.id;
            } else {
                setErrorStatus(true);
                setErrorContent("There is not NYM project");
                return;
            }
            const _result = await Http.get(apiUrl + '/api/datacenter/country?project_id='+_projectId);
            const _serverLocations = _result.data.data;
            setServerLocations(_serverLocations);   
            let _locations = [];
            for(let i = 0; i < _serverLocations.length; i++)
            {
                const _serverLoc = _serverLocations[i];
                let _loc = {
                    city: _serverLoc.city,
                    country: flagList[_serverLoc.country].country,
                    flag: flagList[_serverLoc.country].flag,
                    name: _serverLoc.country,
                    id: _serverLoc.id
                }
                _locations.push(_loc);
            }
            setLocations(_locations);
            setSelectedLocationIndex(0);
            const _serverLocation = _serverLocations[0];
            console.log("Server Locations: ", _serverLocations);
            const _servers = _serverLocation.server;
            setServers(_servers);
        } catch (error) {
            setErrorStatus(true);
            setErrorContent("There is error in getting servers");
        }
    }


    // const selectDatacenter = (idx) => {
    //     setSelectedDataCenter(idx);
    // }

    const selectLocation = (idx) => {
        setSelectedLocationIndex(idx);
        setSelectedId(0);
        setMonthlyPrice(0);
        const _limitBalance = Number((onbordingFee*1 + gasFee).toFixed(2));
        setLimitBalance(_limitBalance);
        setBalanceStatus(false);
        const _serverLocation = serverLocations[idx];
        const _servers = _serverLocation.server;
        setServers(_servers);
        
    }

    const getNymSettings = async() => {
        let _projectId = 0;
        const _projectResult = await Http.get(apiUrl + '/api/project/detail/NYM');
        if(_projectResult.data.status == 1)
        {
            _projectId = _projectResult.data.project.id;
        } else {
            setErrorStatus(true);
            setErrorContent("There is not NYM project");
            return;
        }
        let _setupFee = onbordingFee;
        try {
            const result = await Http.get(apiUrl+'/api/project/wizard-setting-view/'+_projectId);
            _setupFee = result.data.data.wizard_setting.setup_fee*100/100;
            setOnbordingFee(_setupFee);
            // const _minStake = result.data.data.wizard_setting.min_stake*100/100;        
        } catch (error) {
            console.log("There is errro in getting the setting data");
        }
        const _limitBalance = Number((_setupFee + gasFee).toFixed(2));
        setLimitBalance(_limitBalance);
        console.log("limit balance ::: ", _limitBalance);
        if(balance < _limitBalance) {
            setPaymentBtnText("Top-up account");
            setBalanceStatus(true);
        } else {
            setPaymentBtnText("Complete Payment");
            setBalanceStatus(false);
        }
    }

    useEffect(() => {
        getEuroRate();
        getServers();    
    }, []);

    useEffect(()=> {
        getNymSettings();        
    }, [balance]);
    return (
        <React.Fragment>
        {
            loadingStatus ? 
            <LoadingSpinner /> : 
            <div className="steps">
                <Header setBalance={setBalance} myBalance={balance} step={3} />
                <div className="steps-content fullwidthcontainer fiatscreen step5">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-7">
                                <div className="borerbox">
                                    <div className="p30">
                                        <h3>Choose server configuration</h3>
                                        
                                        <div className="server_table table-responsive">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Name</th>
                                                        <th>VCPUS</th>
                                                        <th>RAM</th>
                                                        <th>SSD</th>
                                                        <th>Price/m</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    { servers.length > 0 &&
                                                        servers.map((server, i) => {
                                                            return (
                                                                <tr role="button" key={i} onClick={()=>selectServer(i)} className={selectedId==server.id?"selected":""}>
                                                                    <td className="graytext"> { i+1 }</td>
                                                                    <td>{server.location}</td>
                                                                    <td><span className="vcpus"><img src={apiUrl + "/img/icon-vspus.svg"} /> {server.cores + " core " + coreTypes[server.type-1].name}</span></td>
                                                                    <td className="graytext"> {server.memory} GB</td>
                                                                    <td><span><img src={apiUrl + "/img/icon-storage.svg"} /> {server.disk+" GB"}</span></td>
                                                                    <td><span>{Number((server.price_monthly_gross * exchangeRate).toFixed(2))} USDT</span></td>
                                                                </tr>
                                                            );
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>

                                        {/* <div className="form-group mt-4">
                                            <label>Choose Hosting Provider</label>
                                            <Dropdown className="dropdown-currency">
                                                <Dropdown.Toggle variant="default" id="">
                                                    {
                                                        selectedDataCenter >= 0 ?
                                                        <React.Fragment>
                                                        {dataCenters[selectedDataCenter]}
                                                        <span className="caret"></span>
                                                        </React.Fragment> :
                                                        <React.Fragment>
                                                            <a>Please select datacenter</a>
                                                            <span className="caret"></span>
                                                        </React.Fragment>
                                                    }
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                {
                                                    dataCenters.length > 0 && dataCenters.map((dataCenter, i) => {
                                                        return(
                                                            <li key={i}>
                                                                <Dropdown.Item onClick={()=>selectDatacenter(i)}> { dataCenter }</Dropdown.Item>
                                                            </li>
                                                        )
                                                    })
                                                }
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div> */}
                                        
                                        <div className="form-group mt-4">
                                            <label>Choose a country</label>
                                            <Dropdown className="dropdown-currency">
                                                <Dropdown.Toggle variant="default" id="">
                                                {
                                                    selectedLocationIndex >= 0 ?
                                                    <React.Fragment>
                                                        <img src={apiUrl+"/images/flags/" + locations[selectedLocationIndex].flag} className="rounded-circle" /> {locations[selectedLocationIndex].city + ", " + locations[selectedLocationIndex].country}
                                                        <span className="caret"></span>
                                                    </React.Fragment> :
                                                    <React.Fragment>
                                                        <a>Please select country</a>
                                                        <span className="caret"></span>
                                                    </React.Fragment>
                                                }
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                {
                                                    locations.length > 0 && locations.map((location, i) => {
                                                        return(
                                                            <li key={i}>
                                                                <Dropdown.Item onClick={()=>selectLocation(i)}><img src={apiUrl+"/images/flags/" + location.flag} className="rounded-circle" /> { location.city + ", " + location.country }</Dropdown.Item>
                                                            </li>
                                                        )
                                                    })
                                                }
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>

                                        <div className="blueboxtext">
                                            <p>Choose Hosting provider and a country where your node will be located.</p>
                                            <p>For NYM nodes minimal server configuration works great. We recommend to choose the cheapest server configuration for the chosen country.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-5">
                                <div className="borerbox" style={{border:0, background:'transparent', paddingLeft:0}}>
                                    <div className="items transferdetailsbox server-balance-block border-left">
                                        <div className="title">My Balance <span>{balance} $USDT</span></div>
                                        <h4>Payment details</h4>
                                        <div className="row">
                                            <label className="col-sm-8">Server Current Month Payment</label>
                                            <p className="col-sm-4">{monthlyPrice} $USDT</p>
                                        </div>
                                        <div className="row">
                                            <label className="col-sm-8">One-time onboarding fee</label>
                                            <p className="col-sm-4">{onbordingFee} $USDT</p>
                                        </div>
                                        <div className="row">
                                            <label className="col-sm-8">Gas fee</label>
                                            <p className="col-sm-4">{gasFee} $USDT</p>
                                        </div>
                                        <div className="totalrow">
                                            <div className="row">
                                                <label className="col-sm-8">Total</label>
                                                <p className="col-sm-4 mt-2">{limitBalance} $USDT</p>
                                            </div>
                                        </div>
                                        {
                                            balance>limitBalance?"":<div className="insufficientbalance">Your balance has insufficient funds</div>
                                        }
                                        
                                        <div className="btn-container">
                                            <a onClick={()=>gotoTopupPage()} className={balanceStatus?"btn btn-new btn-primary":"btn btn-gray"}>{paymentBtnText}</a>
                                        </div>
                                    </div>
                                </div>
                                <p className="whitetext">Feel free to contact our support for any possible questions:</p>
                                <div className="f-c-d-support">
                                    <div className="email">
                                        <a href="#">support@nodigy.com</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ErrorModal errorContent={errorContent} status={errorStatus} />
                <Footer step={step} prevUrl={prevUrl} nextUrl={nextUrl} />
            </div>
        }
        </React.Fragment>
    )
}
export default ChooseServer;