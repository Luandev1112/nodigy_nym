import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Header from '../common/Header';
import Footer from '../common/Footer';
const InstallGuide = () => {
    const [balance, setBalance] = useState(0);
    const [step, setStep] = useState(6);
    const [nextUrl, setNextUrl] = useState('');
    const [prevUrl, setPrevUrl] = useState('/wallet-idetification'); 
    const navigate = useNavigate();
    const gotoPrevPage = () => {
        navigate('/wallet-identification');
    }
    useEffect(() => {
        const videoPlayer = document.getElementById('autoplay');
        videoPlayer.play();
    });
    return (
        <div className="steps">
            <Header setBalance={setBalance} myBalance={balance} step={6} />
            <div className="steps-content step4 wallet-installation">
                <div className="container">
                    <div className="title">Wallet installation guide</div>
                    <div className="video-container">
                        <video id="autoplay" muted playsInline controls loop>
                            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                            <source src="https://www.w3schools.com/html/mov_bbb.ogg" type="video/ogg" />
                            Your browser does not support HTML video.
                        </video>
                    </div>
                    <div className="btn-container">
                        <a onClick={()=>gotoPrevPage()} role='button' className="btn btn-default">Wallet Identification</a>
                    </div>
                </div>
            </div>
            <Footer step={step} prevUrl={prevUrl} nextUrl={nextUrl}/>
        </div>
    )
}
export default InstallGuide;