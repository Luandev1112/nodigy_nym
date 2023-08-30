import React, { useEffect, useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import Http from "../utils/Http";
import { TronLinkAdapter } from "@tronweb3/tronwallet-adapter-tronlink";
import { useNavigate } from 'react-router-dom';

import Header from "../common/Header";
import Footer from "../common/Footer";
import ProgressBar from "../common/ProgressBar";

const TopupAccount = () => {
  const [cardNumber, setCardNumber] = useState("1234 5678 89012 3456");
  const [cardHolder, setCardHolder] = useState("JOHN DOE");
  const [expirationDate, setExpirationDate] = useState("02 / 2024");
  const [cvv, setCVV] = useState("111");
  const [amountFrom, setAmountFrom] = useState("301 000 000");
  const [amountTo, setAmountTo] = useState(29.01);
  const [tabType, setTabType] = useState("card");
  const [walletList, setWalletList] = useState([{wallet_logo: 'wallet_img_64aea07746f67_1689165943.png', supp_wallet_name: 'TronLink'}]);
  const [selectedWallet, setSelectedWallet] = useState({wallet_logo: 'wallet_img_64aea07746f67_1689165943.png', supp_wallet_name: 'TronLink'});
  const [connectedWallet, setConnectedWallet] = useState(null);
  const [balanceType, setBalanceType] = useState('server');
  const [loadig, setLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(false);
  const [walletPrice, setWalletPrice] = useState(0);
  const [walletInstalled, setWalletInstalled] = useState(false);
  const [maxToken, setMaxToken] = useState(0);
  const mediaUrl = "https://static.nodigy.com/";
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState(false);

  const [step, setStep] = useState(4);
  const [subStep, setSubStep] = useState(0);
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('/choose-server'); 

  // TronLink transaction constant settings
  // const contractWalletAddress = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
  const contractWalletAddress = "TXYZopYRdj2D9XRtbG411XZZ3kM5VkAeBf";
  const receiverAddress = "TJ4jSwMBREYysPQcjATTy52AXdXrdVXhM2";
  // const receiverAddress = "TCPnqhNozXMaY4gFxvLWKS26FmPhDHvWvD";
  const transactionUrl = "https://nile.tronscan.io/#/transaction/";
  const baseUrl = "https://nodigy.com";
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    switch (name) {
      case "card_number":
        setCardNumber(value);
        break;
      case "card_holder":
        setCardHolder(value);
        break;
      case "expiration_date":
        setExpirationDate(value);
        break;
      case "cvv":
        setCVV(value);
        break;
      case "amount_from":
        setAmountFrom(value);
        break;
      case "amount_to":
        setAmountTo(value);
        break;
      case "wallet_price":
        setWalletPrice(value);
        break;
    }
  };

  const changeTabType = (type) => {
    setTabType(type);
  };

  const handleDeposit = async () => {
    switch (balanceType) {
      case "server":
        if (tabType == "card") {
          // paymentByCard();
          // setSubStep('deposit-success');
          // setStep(5);
        } else if (tabType == "crypto") {
          console.log(typeof walletPrice);
          await paymentByWallet();
          navigate('/choose-server');
        }

        break;
      case "deposit":
        setSubStep("deposit-success");
        setStep(7);
        break;
    }
  };

  const paymentByCard = async () => {
    const formData = new FormData();
    formData.append("card_number", cardNumber);
    formData.append("card_holder", cardHolder);
    formData.append("expiration_date", expirationDate);
    formData.append("cvv", cvv);
    formData.append("amount_from", amountFrom);
    formData.append("amount_to", amountTo);
    const result = await Http.post("admin/api/cardPayment", formData);
    if (result.data.user) {
      const _myBalance = result.data.user.balance;
      setBalance(_myBalance);
    }
  };

  const paymentByWallet = async () => {
    if (typeof walletPrice * 1 != "NaN" && walletPrice < maxToken) {
      if (selectedWallet.supp_wallet_name.toLowerCase() == "tronlink") {
        const tronWeb = window.tronWeb;

        var senderAddress = connectedWallet.address;
        var _amount = walletPrice * 1000000;

        var parameter = [
          { type: "address", value: receiverAddress },
          { type: "uint256", value: _amount },
        ];
        var options = {
          feeLimit: 100000000,
        };

        const transactionObject =
          await tronWeb.transactionBuilder.triggerSmartContract(
            tronWeb.address.toHex(contractWalletAddress),
            "transfer(address,uint256)",
            options,
            parameter,
            tronWeb.address.toHex(senderAddress)
          );

        var signedTransaction = await tronWeb.trx.sign(
          transactionObject.transaction
        );
        var broadcastTransaction = await tronWeb.trx.sendRawTransaction(
          signedTransaction
        );
        console.log("broadcast transaction: ", broadcastTransaction);
        if (broadcastTransaction.result) {
          const _transactionId = broadcastTransaction.txid;
          console.log(
            "transaction time : ",
            broadcastTransaction.transaction.raw_data.timestamp
          );

          const formData = new FormData();
          formData.append("wallet_name", connectedWallet.name);
          formData.append("amount", walletPrice);
          formData.append("wallet_address", connectedWallet.address);
          formData.append("transaction_id", _transactionId);
          formData.append("success", 1);
          formData.append(
            "date",
            broadcastTransaction.transaction.raw_data.timestamp
          );
          const result = await Http.post(baseUrl+"/api/walletPayment", formData);
          if (result.data.user) {
            const _myBalance = result.data.user.balance;
            setBalance(_myBalance);
          }
        }
      }
    }
  };

  const walletConnect = async () => {
    const walletName = selectedWallet.supp_wallet_name;
    switch (walletName.toLowerCase()) {
      case "tronlink":
        await connectTron();
        break;
    }
  };

  const shortenAddress = (address) => {
    let newString = address.substr(0, 5) + "..." + address.substr(-5, 5);
    return newString;
  };

  const disconnectWallet = (walletName) => {
    setConnectedWallet(null);
  };

  const connectTron = async () => {
    if (window.tronWeb) {
      const wtronweb = window.tronWeb;
      const adapter = new TronLinkAdapter();
      // connect
      await adapter.connect();
      try {
        const message = "Wallet connection";
        await adapter.signMessage(message);
        if (window.tronWeb.ready) {
          const _walletAddress = adapter.address;
          const _connectedWallet = {
            name: "TronLink",
            address: _walletAddress,
            logo: selectedWallet.wallet_logo,
          };
          setConnectedWallet(_connectedWallet);
          setConnectionStatus(true);

          const { abi } = await wtronweb.trx.getContract(contractWalletAddress);
          const usdtContract = wtronweb.contract(
            abi.entrys,
            contractWalletAddress
          );
          const balance = await usdtContract.methods
            .balanceOf(_walletAddress)
            .call();
          const walletBalance = Number(balance) / 1000000;
          setMaxToken(walletBalance);
        }
      } catch (error) {}
    } else {
      alert("Please install TronLink Wallet");
    }

    // const targetAddress = "TCPnqhNozXMaY4gFxvLWKS26FmPhDHvWvD";
    // // create a send TRX transaction
    // const unSignedTransaction = await tronWeb.transactionBuilder.sendTrx(targetAddress, 10, adapter.address);
    // // using adapter to sign the transaction
    // const signedTransaction = await adapter.signTransaction(unSignedTransaction);
    // // broadcast the transaction
    // const transactionResult = await tronWeb.trx.sendRawTransaction(signedTransaction);
    // console.log(transactionResult);
  };

  const changeWallet = () => {
    if (typeof window.tronWeb !== 'undefined') {
      setWalletInstalled(true);
    } else {
        setWalletInstalled(false);
    }
  }

  useEffect(() => {
    changeWallet();
  }, []);

  return (
    <div className="steps">
      <Header setBalance={setBalance} />
      <ProgressBar step={5} />
      <div className="steps-content fullwidthcontainer fiatscreen step5">
        <div className="container">
          <div className="row">
            <div className="col-sm-7">
              <div className="borerbox">
                <div className="p30">
                  <h3>Top-up account</h3>
                  <div className="topuptabs">
                    <ul className="nav nav-tabs" role="tablist">
                      <li
                        role="presentation"
                        className={tabType == "card" ? "active" : ""}>
                        <a
                          onClick={() => changeTabType("card")}
                          aria-controls="card"
                          role="tab"
                          data-toggle="tab">
                          <svg
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M29.3334 10.0665C29.3334 10.9465 28.6134 11.6665 27.7334 11.6665H4.26675C3.38675 11.6665 2.66675 10.9465 2.66675 10.0665V10.0532C2.66675 6.99987 5.13341 4.5332 8.18675 4.5332H23.8001C26.8534 4.5332 29.3334 7.0132 29.3334 10.0665Z"
                              fill="#ffffff"
                            />
                            <path
                              d="M2.66675 15.2665V21.9465C2.66675 24.9998 5.13341 27.4665 8.18675 27.4665H23.8001C26.8534 27.4665 29.3334 24.9865 29.3334 21.9332V15.2665C29.3334 14.3865 28.6134 13.6665 27.7334 13.6665H4.26675C3.38675 13.6665 2.66675 14.3865 2.66675 15.2665ZM10.6667 22.9998H8.00008C7.45341 22.9998 7.00008 22.5465 7.00008 21.9998C7.00008 21.4532 7.45341 20.9998 8.00008 20.9998H10.6667C11.2134 20.9998 11.6667 21.4532 11.6667 21.9998C11.6667 22.5465 11.2134 22.9998 10.6667 22.9998ZM19.3334 22.9998H14.0001C13.4534 22.9998 13.0001 22.5465 13.0001 21.9998C13.0001 21.4532 13.4534 20.9998 14.0001 20.9998H19.3334C19.8801 20.9998 20.3334 21.4532 20.3334 21.9998C20.3334 22.5465 19.8801 22.9998 19.3334 22.9998Z"
                              fill="#ffffff"
                            />
                          </svg>{" "}
                          <span>Сard</span>
                        </a>
                      </li>
                      <li
                        role="presentation"
                        className={tabType == "crypto" ? "active" : ""}>
                        <a
                          onClick={() => changeTabType("crypto")}
                          aria-controls="crypto"
                          role="tab"
                          data-toggle="tab">
                          <svg
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M29.3334 11.3332C29.3334 15.6798 26.1334 19.2665 21.9734 19.8932V19.8132C21.56 14.6398 17.36 10.4398 12.1467 10.0265H12.1067C12.7334 5.8665 16.32 2.6665 20.6667 2.6665C25.4534 2.6665 29.3334 6.5465 29.3334 11.3332Z"
                              fill="#ffffff"
                            />
                            <path
                              d="M19.9734 19.9733C19.6401 15.7467 16.2534 12.36 12.0267 12.0267C11.8001 12.0133 11.5601 12 11.3334 12C6.54675 12 2.66675 15.88 2.66675 20.6667C2.66675 25.4533 6.54675 29.3333 11.3334 29.3333C16.1201 29.3333 20.0001 25.4533 20.0001 20.6667C20.0001 20.44 19.9867 20.2 19.9734 19.9733ZM12.5067 21.84L11.3334 24L10.1601 21.84L8.00008 20.6667L10.1601 19.4933L11.3334 17.3333L12.5067 19.4933L14.6667 20.6667L12.5067 21.84Z"
                              fill="#ffffff"
                            />
                          </svg>{" "}
                          <span>Сrypto</span>
                        </a>
                      </li>
                    </ul>
                    <div className="tab-content">
                      {tabType == "card" && (
                        <div role="tabpanel" className="" id="card">
                          <div className="form-group">
                            <label>Card Number</label>
                            <div className="card-number">
                              <img
                                className="cardicon"
                                src={baseUrl + "/img/icon-visa.png"}
                              />
                              <input
                                type="text"
                                className="form-control"
                                name="card_number"
                                value={cardNumber}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Card Holder</label>
                            <input
                              type="text"
                              className="form-control"
                              name="card_holder"
                              value={cardHolder}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="row">
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label>Expiration</label>
                                <input
                                  type="text"
                                  name="expiration_date"
                                  className="form-control"
                                  value={expirationDate}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label>CVV</label>
                                <input
                                  type="text"
                                  name="cvv"
                                  className="form-control"
                                  value={cvv}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="yourcardinfodiv">
                            Your card/wallet data will be used for charge JUST
                            ONCE (now). In the future, monthly payments will be
                            charged only from your account balance, and you'll
                            receive a reminder to replenish it.
                          </div>
                          <div className="form-group amountdiv">
                            <label>Amount</label>
                            <div className="row">
                              <div className="col-sm-6">
                                <div className="amount_cus_dropdown">USD</div>
                                <input
                                  type="text"
                                  name="amount_from"
                                  className="form-control"
                                  value={amountFrom}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="col-sm-6">
                                <div className="amount_cus_dropdown">USDT</div>
                                <input
                                  type="text"
                                  name="amount_to"
                                  className="form-control"
                                  value={amountTo}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="btn-container">
                            {/* <!--input type="button" className="btn btn-primary btn-new width100" value="Deposit" /--> */}
                            <a
                              onClick={() => handleDeposit()}
                              className="btn btn-primary btn-new width100">
                              Deposit
                            </a>
                          </div>
                        </div>
                      )}
                      {tabType == "crypto" && (
                        <div role="tabpanel" className="" id="crypto">
                          <div className="form-group">
                            <label>Source wallet</label>
                            <Dropdown className="dropdown-currency">
                              <Dropdown.Toggle
                                variant="default"
                                id="dropdown-currency">
                                {selectedWallet ? (
                                  <React.Fragment>
                                    <img
                                      src={
                                        mediaUrl +
                                        "wallet_logo/" +
                                        selectedWallet.wallet_logo
                                      }
                                    />{" "}
                                    {selectedWallet.supp_wallet_name}
                                    {walletInstalled ? (
                                      ""
                                    ) : (
                                      <a className="anchortext mx-3" href="#">
                                        Install wallet
                                      </a>
                                    )}
                                    <span className="caret"></span>
                                  </React.Fragment>
                                ) : (
                                  <React.Fragment>
                                    <a className="">Please select wallet</a>
                                    <span className="caret"></span>
                                  </React.Fragment>
                                )}
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                {walletList.length > 0 &&
                                  walletList.map((wallet, i) => {
                                    return (
                                      <li key={i}>
                                        <Dropdown.Item>
                                          <img
                                            src={
                                              mediaUrl +
                                              "wallet_logo/" +
                                              wallet.wallet_logo
                                            }
                                          />{" "}
                                          {wallet.supp_wallet_name}
                                        </Dropdown.Item>
                                      </li>
                                    );
                                  })}
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                          <div className="btn-container">
                            <button
                              type="button"
                              className="btn btn-primary btn-new btn-gray width100"
                              onClick={() => walletConnect()}>
                              Connect
                            </button>
                          </div>
                          <div className="disconnectaccount item border-left">
                            {connectedWallet ? (
                              <React.Fragment>
                                <div className="icon">
                                  <img
                                    src={
                                      mediaUrl +
                                      "wallet_logo/" +
                                      connectedWallet.logo
                                    }
                                  />
                                </div>
                                <div className="text">
                                  <p>
                                    {shortenAddress(connectedWallet.address)}
                                  </p>
                                  <div className="link-disconnect">
                                    <a
                                      className="btn-disconect"
                                      onClick={() =>
                                        disconnectWallet(connectedWallet.name)
                                      }>
                                      <img
                                        src={
                                          baseUrl + "/img/icon-close-circle.svg"
                                        }
                                      />
                                      Disconnect
                                    </a>
                                  </div>
                                </div>
                              </React.Fragment>
                            ) : (
                              <React.Fragment> </React.Fragment>
                            )}
                          </div>
                          <div className="n_r_form_field">
                            <p>
                              {maxToken} $USDT <span>MAX</span>
                            </p>
                            <div className="form-group">
                              <span>$USDT</span>
                              <input
                                type="text"
                                className="form-control"
                                name="wallet_price"
                                onChange={handleChange}
                                value={walletPrice}
                              />
                            </div>
                          </div>
                          <div className="btn-container">
                            <button
                              onClick={() => handleDeposit()}
                              type="button"
                              className="btn btn-primary btn-new width100">
                              Deposit
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-5">
              <div
                className="borerbox"
                style={{
                  border: 0,
                  background: "transparent",
                  paddingLeft: 0,
                }}>
                <div className="items transferdetailsbox server-balance-block border-left">
                  <div className="dipositedundsinfo">
                    <div className="img">
                      <img src={baseUrl + "/img/img-dipositedundsinfo.png"} />
                    </div>
                    <p>
                      Funds will be deposited to your account balance and used
                      to pay a one-time onboarding fee and server payment for
                      the first month.
                    </p>
                  </div>
                </div>
              </div>
              <p className="whitetext">
                Feel free to contact our support for any possible questions:
              </p>
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
  );
};
export default TopupAccount;
