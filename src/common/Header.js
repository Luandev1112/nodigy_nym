import React, { useState, useEffect } from 'react';
import Http from "../utils/Http";
import { Button, Dropdown, Modal } from 'react-bootstrap';
import LogoImage from "../assets/images/logo.svg";
import ProfileImage from "../assets/images/profile-img.png";
import IconSettingsImage from "../assets/images/icon-setings.png";
import IconEmptyWallet from "../assets/images/icon-empty-wallet.png";
import IconLogoutImage from "../assets/images/icon-setings.png";
import IconNotifications from "../assets/images/icon-notifications.png";

const Header = ({setBalance, myBalance}) => {
    const [darkMode, setDarkMode] = useState(true);
    const changeMode = () => {
        darkMode ? setDarkMode(false) : setDarkMode(true);
    }
    const [user, setUser] = useState(null);
    const [userBalance, setUserBalance] = useState(0);

    const baseURL = "http://localhost";

    const getApiUser = async() => {
      try{
        const res = await Http.get(baseURL + "/api/user");
        if(res.data.success)
        {
          setUser(res.data.data);
          setUserBalance(res.data.data.balance);
          setBalance(res.data.data.balance);
        }
      }catch(err){
        console.log("error:::", err);
        window.location.href = baseURL;
      }
    }

    useEffect(()=>{
      getApiUser();
    }, []);

    useEffect(()=>{
      if(myBalance >= 0){
        setUserBalance(myBalance);
      }
    }, [myBalance]);

    return (
      user &&
      <div className="step-header">
        <div className="container">
          <div className="logo"><img src={LogoImage} /></div>
          <div className="btn-header actionright">
            <div className="walletdropdown">
                <button aria-haspopup="true" aria-expanded="false" id="" type="button" className="dropdown-toggle btn btn-default">
                <img src={IconEmptyWallet} /> <span>{userBalance} USDT</span>
                </button>
            </div>

            <Dropdown className="notifications">
                <Dropdown.Toggle variant="default" id="">
                    <img src={IconNotifications} />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <li><Dropdown.Item>Option 1</Dropdown.Item></li>
                    <li><Dropdown.Item>Option 2</Dropdown.Item></li>
                </Dropdown.Menu>
            </Dropdown>
            
            <Dropdown className="profiledropdown">
                <Dropdown.Toggle variant="default" id="">
                    <div className="img"><img src={ProfileImage} /></div>
                    {/* <span>Кузнецова Мария</span> */}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <li className="title"><Dropdown.Item>{user.name}</Dropdown.Item></li>
                    <li><Dropdown.Item><img src={IconSettingsImage} /> Account settings</Dropdown.Item></li>
                    <li><Dropdown.Item><img src={IconLogoutImage} /> Logout</Dropdown.Item></li>
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
    )
}

export default Header;
