import React, { useState, useEffect } from 'react';
import {useNavigate, useSearchParams, useLocation} from 'react-router-dom';
import Http from "../utils/Http";
import { Button, Dropdown, Modal } from 'react-bootstrap';
import LogoImage from "../assets/images/logo.svg";
import ProfileImage from "../assets/images/Single-Male.svg";
import IconSettingsImage from "../assets/images/icon-setings.png";
import IconEmptyWallet from "../assets/images/icon-empty-wallet.png";
import IconLogoutImage from "../assets/images/icon-logout.png";
import IconNotifications from "../assets/images/icon-notifications.svg";
import ProgressBar from './ProgressBar';
import { apiUrl } from '../utils/urls';
import IconDoubleCheckImage from "../assets/images/icon-doublecheck-blue.svg";

const Header = ({setBalance, myBalance, step}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [nodeId, setNodeId] = useState(searchParams.get('nodeId'));
  const [darkMode, setDarkMode] = useState(true);
  const [user, setUser] = useState(null);
  const [userBalance, setUserBalance] = useState(0);
  const [notiData, setNotiData] = useState(null);
  const [notiCount, setNotiCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  
  const changeMode = () => {
    darkMode ? setDarkMode(false) : setDarkMode(true);
  }

  const getApiUser = async() => {
    try{
      const res = await Http.get(apiUrl + "/api/user");
      if(res.data.success)
      {
        setUser(res.data.data);
        setUserBalance(res.data.data.balance);
        setBalance(res.data.data.balance);
        localStorage.setItem('access_token', res.data.data.token);
      }
    }catch(err){
      window.location.href = apiUrl+"/admin/add-new-node";
    }
  }

  const getInitNode = async() => {
    if (location.pathname != '/top-up-account' && location.pathname != '/deposit-success' && location.pathname != '/wallet-install-guide') {
      try {
        const _initNode = await Http.get(apiUrl+'/api/nym/get-initial-node');
        console.log("Header Init Node: ", _initNode);
        if(_initNode.data.status == 1) {
            const _node = _initNode.data.node;
            switch(_node.installation_status) {
                case 'server':
                    navigate('/wallet-identification');
                break;
                case 'wallet':
                    navigate('/wallet-installation-success');
                break;
                case 'install':
                    navigate('/node-install')
                break;
                case 'signature':
                    navigate('/bond-wallet');
                break;
                default:
                  navigate('/choose-server');
                break;
            }
        } else {
          if(nodeId) {
            const formData = new FormData();
            formData.append('node_id', nodeId);
            const _nodeResult = await Http.post(apiUrl+'/api/nym/node-info', formData);
            if(_nodeResult.data.status == 1) {
              const _node = _nodeResult.data.node;
              if(_node.node_status == 1) {
                switch(_node.installation_status) {
                  case 'success':
                    navigate('/node-installation-success?nodeId='+nodeId);
                  break;
                  case 'stake':
                    navigate('/stake?nodeId='+nodeId);
                  break;
                  case 'dashboard':
                    navigate('/stake-success?nodeId='+nodeId);
                  break;
                  default:
                    navigate('/choose-server');
                }
              } else {
                navigate('/choose-server');
              }
            }else {
              navigate('/choose-server');
            }
          }else {
            navigate('/choose-server');
          }
        }
      } catch (error) {
        console.log("error::::", error);
      }
    }
  }

  const shortenEmail = (email) => {
    if(email && email.length > 0) {
      const strArray = email.split("@");
      let firstString = strArray[0];
      let secondString = strArray[1];
      if(firstString.length <= 2){
          newString = "**";
      }else{
        firstString = firstString.substr(0 , 1) + "**" + firstString.substr(-1, 1) + "@";
      }
      return firstString + secondString;
    }else {
      return email;
    }  
  }

  const getNotificationData = async()=>{
    try {
      const result = await Http.get(apiUrl+'/api/notification?filter_is_read=0');
      const _notifications = result.data.data.notifications;
      if(_notifications) {
        setNotiData(_notifications);
      }
    }
    catch (error) {

    }
  }

  const setNotificationsRead = async() => {
    console.log("Notification Read");
    try {
      const result = await Http.get(apiUrl+'/api/notification/mark-all-as-read');
    }
    catch (error) {
      console.log("error :", error);
    }
  }

  const checkNotifications = async() => {
    await getNotificationData();
    setTimeout(()=>{
      setNotiCount(notiCount + 1);
    }, 5000);
  }

  useEffect(()=>{
    getApiUser();
    getInitNode();
  }, []);

  useEffect(()=>{
    checkNotifications();
  }, [notiCount]);

  useEffect(()=>{
    if(myBalance >= 0){
      setUserBalance(myBalance);
    }
  }, [myBalance]);

  return (
    user &&
    <div className="header-group">
      <div className="step-header">
        <div className="container">
          <a className="logo" href={apiUrl+'/admin'}><img src={LogoImage} /></a>
          <div className="btn-header actionright">
            <div className="walletdropdown">
                <button aria-haspopup="true" aria-expanded="false" id="" type="button" className="dropdown-toggle btn btn-default">
                <img src={IconEmptyWallet} /> <span>{userBalance} USDT</span>
                </button>
            </div>

            <Dropdown className="notifications">
              <Dropdown.Toggle variant="default" id="">
                <img src={IconNotifications} />
                {notiData && notiData.length > 0 && 
                  <div className="noti-badge" />
                }
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <div className='notifications-header'>
                  <h3>Notifications</h3>
                  <a role='button' onClick={()=>setNotificationsRead()}><img src={IconDoubleCheckImage} />Mark all as read</a>
                </div>
                <div className='notifications-body'>
                  {notiData && notiData.length > 0 &&
                    notiData.map((notification, i)=>{
                      return (
                        <li key={i}>
                          <Dropdown.Item>
                            <div className='noti-img'>
                              <img src={notification.image_url} />
                            </div>
                            <div className='noti-content'>
                              <h4 className='noti-title'>
                                {notification.title}
                              </h4>
                              <p className='noti-description' dangerouslySetInnerHTML={{ __html: notification.content }} />
                              <span className='noti-time'>{notification.date_view}</span>
                            </div>
                          </Dropdown.Item>
                        </li>
                      )
                    })
                  }
                </div>
                <div className='notifications-footer'>
                  <a role='button' href={apiUrl + '/admin/notifications'}>See all notifications</a>
                </div>
              </Dropdown.Menu>
            </Dropdown>
            
            <Dropdown className="profiledropdown">
                <Dropdown.Toggle variant="default" id="">
                    <div className="img"><img src={ProfileImage} /></div>
                    {/* <span>Кузнецова Мария</span> */}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <li className="title"><Dropdown.Item>{shortenEmail(user.email)}</Dropdown.Item></li>
                    <li><Dropdown.Item href={apiUrl+'/admin/settings/emails'} ><img src={IconSettingsImage} /> Account settings</Dropdown.Item></li>
                    <li><Dropdown.Item href={apiUrl+'/logout'} ><img src={IconLogoutImage} /> Logout</Dropdown.Item></li>
                    <li className="last">
                        <span className="text">Dark mode</span>
                        <div className="cus_switch themechange">
                            <input type="checkbox" checked={darkMode} onChange={changeMode} />
                            <span></span>
                        </div>
                    </li>
                </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
      <ProgressBar step={step} />
    </div>
    
  )
}

export default Header;
