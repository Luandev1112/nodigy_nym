import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Http from "../utils/Http";
import { Form, Dropdown } from 'react-bootstrap';
import flagList from "../data/wallet/flagList.json"
import Header from '../common/Header';
import Footer from '../common/Footer';
import ProgressBar from '../common/ProgressBar';

const ChooseServer = () => {
    const [selectedId, setSelectedId] = useState(0);
    const [limitBalance, setLimitBalance] = useState(0);
    const [selectedServer, setSelectedServer] = useState(null);
    const [servers, setServers] = useState([]);
    const [project, setProject] = useState(null);
    const [onbordingFee, setOnbordingFee] = useState(20);
    const [monthlyPrice, setMonthlyPrice] = useState(0);
    const [dataCenters, setDataCenter] = useState(['Hartznerf']);
    const [selectedDataCenter, setSelectedDataCenter] = useState(0);
    const [selectedLocationIndex, setSelectedLocationIndex] = useState(-1);
    const [balance, setBalance] = useState(0);
    const [step, setStep] = useState(3);
    const [subStep, setSubStep] = useState(0);
    const [nextUrl, setNextUrl] = useState('');
    const [prevUrl, setPrevUrl] = useState('http://localhost/admin/wallet-connect'); 
    const [exchangeRate, setExchangeRate] = useState(1);
    const [serverLocations, setServerLocations] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);

    const baseURL = "http://localhost";
    const navigate = useNavigate();

    const selectServer = (idx) => {
        const _selectedServer = servers[idx];
        setSelectedServer(_selectedServer);
        setSelectedId(_selectedServer.id);
        const _priceList = _selectedServer.prices;
        if(_priceList.length > 0){
            const _price = Number((_priceList[0].price_monthly.gross * exchangeRate).toFixed(2));
            setMonthlyPrice(_price);
            const _limitBalance = onbordingFee*1 + _price;
            setLimitBalance(_limitBalance);

            let _serverLocations = [];
            for(let i = 0; i < _priceList.length; i++)
            {
                const _priceData = _priceList[i];
                const _serverLocation = serverLocations.find(location => {
                    return _priceData.location == location.name;
                });
                let _loc = {
                    city: _serverLocation.city,
                    country: flagList[_serverLocation.country].country,
                    flag: flagList[_serverLocation.country].flag,
                    name: _serverLocation.country
                }
                _serverLocations.push(_loc);
            }
            setSelectedLocations(_serverLocations);
        }
    }

    const gotoTopupPage = async() => {
        if(balance > limitBalance){
            // payment function here
            console.log("Selected Server: ", selectedServer);
            if(selectedServer) {
                const formData = new FormData();
                formData.append('server_id', selectedServer.id);
                const result = await Http.post(baseURL + '/api/purchaseServer', formData);
                const userBalance = result.data.user_balance;
                setBalance(userBalance);
                const hashId = result.data.transaction.txn_id;
                navigate('/deposit-success', {
                    state: {
                        hashId: hashId,
                        balanceType: 'server'
                    }
                });
            }
            
        }else{
            navigate('/top-up-account');
        }
    }

    const getServerLocations = async() => {
        const _countries_res = await Http.get(baseURL + '/api/datacenter/server-locations');
        console.log("Countries: ", _countries_res.data.data);
        setServerLocations(_countries_res.data.data.locations);
    }

    const getEuroRate = async() => {
        const _exchangeRate = await Http.get(baseURL + '/api/convert-price/get-exchange-rate/euro');
        setExchangeRate(_exchangeRate.data.data.rate);
    }

    const getAllServers = async() => {
        const _servers = await Http.get(baseURL + '/api/hetzner-api/all-server-types');
        if(_servers.data.success){
            setServers(_servers.data.data);
        }
    }

    const getServers = async() => {
        const _servers = await Http.get(baseURL + '/api/project/wizard-setting-view/2');
        console.log("_servers : ", _servers);
    }

    const selectDatacenter = (idx) => {
        setSelectedDataCenter(idx);
    }

    const selectLocation = (idx) => {
        setSelectedLocationIndex(idx);
    }

    const handleStep = async() => {      const _servers = await Http.get(baseURL + '/api/hetzner-api/project-servers/NYM');
        console.log("Project Servers :::=> ", _servers); 
    }

    useEffect(() => {
        getAllServers();
        getEuroRate();
        getServerLocations();
        getServers();
        // handleStep();
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
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { servers.length > 0 &&
                                                    servers.map((server, i) => {
                                                        return (
                                                            <tr key={i} onClick={()=>selectServer(i)} className={selectedId==server.id?"selected":""}>
                                                                <td className="graytext"> { i+1 }</td>
                                                                <td>{server.name}</td>
                                                                <td><span className="vcpus"><img src={baseURL + "/img/icon-vspus.svg"} /> {server.cores+" "+server.cpu_type}</span></td>
                                                                <td className="graytext"> {server.memory} GB</td>
                                                                <td><span><img src={baseURL + "/img/icon-storage.svg"} /> {server.disk+" GB"}</span></td>
                                                            </tr>
                                                        );
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="form-group mt-4">
                                        <label>Choose Server Configuration</label>
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
                                    </div>
                                    
                                    <div className="form-group mt-4">
                                        <label>Choose a country</label>
                                        <Dropdown className="dropdown-currency">
                                            <Dropdown.Toggle variant="default" id="">
                                                {
                                                    selectedLocationIndex >= 0 ?
                                                    <React.Fragment>
                                                        <img src={baseURL+"/images/flags/" + selectedLocations[selectedLocationIndex].flag} className="rounded-circle" /> {selectedLocations[selectedLocationIndex].city + ", " + selectedLocations[selectedLocationIndex].country}
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
                                                selectedLocations.length > 0 && selectedLocations.map((location, i) => {
                                                    return(
                                                        <li key={i}>
                                                            <Dropdown.Item onClick={()=>selectLocation(i)}><img src={baseURL+"/images/flags/" + location.flag} className="rounded-circle" /> { location.city + ", " + location.country }</Dropdown.Item>
                                                        </li>
                                                    )
                                                })
                                            }
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>

                                    <div className="blueboxtext"><p>Minimum required server configuration means fewer rewards, but also lower monthly payments. The maximized configuration will increase the charge, but you'll also get from validating the most. Recommended parameters option exists to balance things out.</p></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-5">
                            <div className="borerbox" style={{border:0, background:'transparent', paddingLeft:0}}>
                                <div className="items transferdetailsbox server-balance-block border-left">
                                    <div className="title">My Balance <span>{balance} $USDT</span></div>
                                    <h4>Payment details</h4>
                                    <div className="row">
                                        <label className="col-sm-8">Server Monthly Payment</label>
                                        <p className="col-sm-4">{monthlyPrice} $USDT</p>
                                    </div>
                                    <div className="row">
                                        <label className="col-sm-8">One-time onboarding fee</label>
                                        <p className="col-sm-4">{onbordingFee} $USDT</p>
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
                                        <a onClick={()=>gotoTopupPage()} className={balance>limitBalance?"btn btn-new btn-primary":"btn btn-gray"}>{balance>limitBalance?"Complete Payment":"Top-up account"}</a>
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
            <Footer step={step} prevUrl={prevUrl} nextUrl={nextUrl} />
        </div>
    )
}
export default ChooseServer;