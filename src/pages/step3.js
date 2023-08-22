import React from 'react';
import IconLineCloseImage from "../../assets/images/icon-line-close.svg";
import WalletImage1 from "../../assets/images/step3-img1.png";
import WalletImage2 from "../../assets/images/step3-img2.png";
import WalletImage3 from "../../assets/images/step3-img3.png";
import WalletImage4 from "../../assets/images/step3-img4.png";

const Step3 = () => {
    return (
        <div className="steps-content step3">
            <div className="container">
                <div className="title">For this product need to connect wallets</div>
                <div className="desc"><p>Многочлен стабилизирует невероятный критерий сходимости Коши. Несмотря на сложности, абсолютная погрешность последовательно транслирует аксиоматичный расходящийся ряд. Используя таблицу интегралов элементарных функций</p></div>
                <div className="borerbox">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="items item1 border-right">
                                <div className="innerbox transparentbg">
                                    <div className="btn-close"><a href="#"><img src={IconLineCloseImage} /></a></div>
                                    <div className="box-img"><img src={WalletImage1} /></div>
                                    <div className="box-content">
                                        <div className="box-title">MetaMask</div>
                                        <p className="install-wallet">Install wallet</p>
                                        <div className="hover">
                                            <div className="text1">Сеть</div>
                                            <div className="text2">0xd4C9S....9c2E8</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="items item2 border-down border-left">
                                <div className="innerbox transparentbg">
                                    <div className="btn-close"><a href="#"><img src={IconLineCloseImage} /></a></div>
                                    <div className="box-img"><img src={WalletImage2} /></div>
                                    <div className="box-content">
                                        <div className="box-title">MetaMask</div>
                                        <p className="install-wallet">Install wallet</p>
                                        <div className="hover">
                                            <div className="text1">Сеть</div>
                                            <div className="text2">0xd4C9S....9c2E8</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="items item3 border-down border-left">
                                <div className="innerbox transparentbg">
                                    <div className="btn-close"><a href="#"><img src={IconLineCloseImage} /></a></div>
                                    <div className="box-img"><img src={WalletImage3} /></div>
                                    <div className="box-content">
                                        <div className="box-title">MetaMask</div>
                                        <p className="install-wallet">Install wallet</p>
                                        <div className="hover">
                                            <div className="text1">Сеть</div>
                                            <div className="text2">0xd4C9S....9c2E8</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="items item4 border-right">
                                <div className="innerbox transparentbg">
                                    <div className="btn-close"><a href="#"><img src={IconLineCloseImage} /></a></div>
                                    <div className="box-img"><img src={WalletImage4} /></div>
                                    <div className="box-content">
                                        <div className="box-title">MetaMask</div>
                                        <p className="install-wallet">Install wallet</p>
                                        <div className="hover">
                                            <div className="text1">Сеть</div>
                                            <div className="text2">0xd4C9S....9c2E8</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Step3;