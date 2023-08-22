import React from 'react';
import NYMImage from "../../assets/images/nym.png";
import CountryImage from "../../assets/images/country-img.png";

const Fiat1 = () => {
    return (
        <div className="steps-content fullwidthcontainer fiatscreen step5">
            <div className="container">
                <div className="row">
                    <div className="col-sm-7">
                        <div className="borerbox">
                            <div className="items item1 border-left">
                                <div className="innerbox transparentbg">
                                    <div className="box-img"><img src={NYMImage} /></div>
                                    <div className="box-content">
                                        <div className="text1">NYM</div>
                                        <div className="text2"><span className="redtext">APY 7%</span><span className="bluetext">NYM (NYX Mainnet)</span></div>
                                    </div>
                                </div>
                            </div>
                            <div className="p30">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Currency</label>
                                            <div className="dropdown dropdown-currency">
                                                <button className="btn btn-default dropdown-toggle" type="button" id="dropdown-currency" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"><img src={CountryImage} /> EUR <span className="caret"></span></button>
                                                <ul className="dropdown-menu" aria-labelledby="dropdown-currency">
                                                    <li><a href="#"><img src={CountryImage} /> EUR</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Deposit with</label>
                                            <div className="dropdown dropdown-deposit">
                                                <button className="btn btn-default dropdown-toggle" type="button" id="dropdown-deposit" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Bank Transfer <div className="subtext">1 EUR Discounted Transaction Free</div> <span className="caret"></span></button>
                                                <ul className="dropdown-menu" aria-labelledby="dropdown-deposit">
                                                    <li><a href="#">Action</a></li>
                                                    <li><a href="#">Another action</a></li>
                                                    <li><a href="#">Something else here</a></li>
                                                    <li role="separator" className="divider"></li>
                                                    <li><a href="#">Separated link</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Investment amount <span className="info">Max:~715 325,035 NYM</span></label>
                                    <input type="text" className="form-control" value="40 000 000 €" />
                                </div>
                                <p>Final NYM amount depends from conversion rate on the date when we will receive your transfer</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-5">
                        <div className="borerbox" style={{border:0, background:"transparent", paddingLeft: 0}} >
                            <div className="items transferdetailsbox border-left">
                                <div className="title">Transfer details</div>
                                <div className="row">
                                    <label className="col-sm-5">Deposit To This Iban</label>
                                    <p className="col-sm-7">PT34 313131 313 1313131</p>
                                </div>
                                <div className="row">
                                    <label className="col-sm-5">Reference</label>
                                    <p className="col-sm-7">nym9879879</p>
                                </div>
                                <div className="row">
                                    <label className="col-sm-5">Setup fee</label>
                                    <p className="col-sm-7">€20</p>
                                </div>
                                <div className="totalrow">
                                    <div className="row">
                                        <label className="col-sm-5">Total</label>
                                        <p className="col-sm-7">€ 40 000 020</p>
                                    </div>
                                </div>
                                <div className="btn-container">
                                    <a href="#" className="btn btn-default">Deposit</a>
                                </div>
                            </div>
                        </div>
                        <p className="whitetext">If you have questions, please contact with the support: </p>
                        <div className="f-c-d-support">
                            <div className="email">
                                <a href="#">support@aaavalidator.comed</a>
                            </div>
                            <div className="phone">
                                <a href="#">+351 1111 22 333</a>
                            </div>
                        </div>
                    </div>
                </div>   
            </div>
        </div>
    )
}
export default Fiat1;