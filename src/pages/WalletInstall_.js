import React, {useEffect, useState} from 'react';
const WalletInstall = () => {
    useEffect(() => {
        const videoPlayer = document.getElementById('autoplay');
        videoPlayer.play();
    });
    return (
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
                    <a href="#" className="btn btn-default">Connect wallet</a>
                </div>
            </div>
        </div>
    )
}
export default WalletInstall;