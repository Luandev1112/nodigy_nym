import React, {useEffect, useState} from 'react';
import Http from "../../utils/Http";
const WalletList = ({setWalletName, setStep, chooseUserWallet, wallet}) => {
	const [walletList, setWalletList] = useState([]);
	const border_arr = ['border-right', 'border-left', 'border-left', 'border-right'];
	const [status, setStaus] = useState(false);
	const [selectedId, setSelectedId] = useState(0);
	const [selectedWalletName, setSelectedWalletName] = useState("");

	const mediaUrl = "https://static.nodigy.com/";

	const gotoWalletInstallation = (walletName) => {
		setWalletName(walletName);
		setStep(5);
	}

	const shortenAddress = (address) => {
        let newString = address.substr(0 , 5) + "..." + address.substr(-5, 5);
        return newString;
    }

	const getWalletList = async() => {
		const res = await Http.get('/admin/api/getWalletList');
		console.log("wallets : ", res.data.wallets);
		let _wallets = res.data.wallets;
		for(let i = 0; i < _wallets.length; i++){
			let _wallet = _wallets[i];
			const _networkName = _wallet.wallet_name.toLowerCase();
			let walletInstalled = false;
			switch(_networkName){
				case 'metamask':
					if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
						walletInstalled = true;
					} else {
						walletInstalled = false;
					}
				break;
				case 'trustwallet':
					if (typeof window.web3 !== 'undefined' && typeof window.web3.currentProvider !== 'undefined' && window.web3.currentProvider.isTrust) {
						walletInstalled = true;
					} else {
						walletInstalled = false;
					}
				break;
				case 'braavos':
					if (typeof window.ethereum !== 'undefined' && window.ethereum.isBraavos) {
						walletInstalled = true;
					} else {
						walletInstalled = false;
					}
				break;
				case 'keplr':
					if (typeof window.keplr !== 'undefined') {
						walletInstalled = true;
					} else {
						walletInstalled = false;
					}
				break;
				case 'phantom':
					if (window.solana && window.solana.isPhantom) {
						walletInstalled = true;
					} else {
						walletInstalled = false;
					}
				break;
				case 'tronlink':
					if (typeof window.tronWeb !== 'undefined') {
						walletInstalled = true;
					} else {
						walletInstalled = false;
					}
				break;
				default:
					walletInstalled = false
				break;
			}
			_wallet.walletInstalled = walletInstalled;
		}
		console.log("_wallets : ", _wallets);
		setWalletList(_wallets);
	}

	const chooseClass = (wallet, i) => {
		// console.log("wallet => ", wallet);
		const firstClass = "items ";
		let secondClass = "";
		const thirdClass = border_arr[i%4];
		if(wallet.walletInstalled) {
			secondClass = wallet.wallet_address ? "item3 " : "item4 ";
		}else{
			secondClass = "item2 ";
		}
		return firstClass + secondClass + thirdClass;
	}

	const chooseSelectedClass = (wallet) => {
		const className = wallet.id == selectedId ? "col-sm-6 selected" : "col-sm-6"; 
		return className;
	}

	const chooseWallet = (idx) => {
		const _selectedId = walletList[idx].id;
		setSelectedId(_selectedId);
		if(walletList[idx].wallet_address) {
			chooseUserWallet(walletList[idx]);
		}else{
			chooseUserWallet(null);
		}
	}

	const handleInputChage = (e) => {
		e.preventDefault();
		const _name = e.target.name;
		const _value = e.target.value;
		switch(_name) {
			case "wallet_name":
				setSelectedWalletName(_value);
			break;
		}
	}

    useEffect(() => {
		getWalletList();
    }, []);
    return (
        <div className="steps-content step3 connectwallet">
			<div className="container">
				<div className="title">Connect wallet to my node</div>
				<p className="subtext">Your node will need a Web 3 wallet as a source of tokens to stake and as an address to receive rewards. Choose one of the listed options, connect the wallet, and sign a message to prove your ownership. If the connection fails, enter your wallet address in the field below. Make sure to enter it correctly!</p>
				<div className="borerbox">
					<div className="row">
					{
						walletList.map((wallet, i)=>{
							return(
								<div className={chooseSelectedClass(wallet)} key={i}>
									{!wallet.walletInstalled && 
										<div className={chooseClass(wallet, i)} onClick={() => chooseWallet(i)} >
											<div className="innerbox transparentbg">
												<div className="box-img"><img src={mediaUrl+"wallet_logo/"+wallet.image} /></div>
												<div className="box-content">
													<div className="box-title">{wallet.wallet_name}</div>
												</div>
												{!wallet.wallet_address ?
													<a onClick={()=>gotoWalletInstallation(wallet.wallet_name)} className="instwlletbtn">Install wallet</a> :
													<div className="hovercontent">
														<p><span>Network: {wallet.network_name}</span><span><a href="#">Change to  polygon <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.13312 3.99328L3.81979 2.67995L1.67979 0.539951C1.22646 0.0932846 0.453125 0.413285 0.453125 1.05328V5.20662V8.94662C0.453125 9.58662 1.22646 9.90662 1.67979 9.45328L5.13312 5.99995C5.68646 5.45328 5.68646 4.54662 5.13312 3.99328Z" fill="#5129F1"/></svg></a></span></p>
														{wallet.wallet_address && <p><span>{shortenAddress(wallet.wallet_address)}</span><span><a href="#"><img src="/images/icon-copy.svg" /></a></span></p>}
													</div>
												}
											</div>
										</div>		
									}
									{wallet.walletInstalled && !wallet.wallet_address && 
										<div className={chooseClass(wallet, i)} onClick={() => chooseWallet(i)} >
											<div className="innerbox transparentbg">
												<div className="btn-close"><a href="#"><img src="/images/icon-line-close-black.png" /></a></div>
												<div className="box-img"><img src={mediaUrl+"wallet_logo/"+wallet.image} /></div>
												<div className="box-content">
													<div className="box-title">{wallet.wallet_name}</div>
												</div>
												<div className="form-group">
													<label>Node’s owner wallet address:</label>
													<input type="text" className="form-control" name="wallet_name" placeholder="placeholder" onChange={handleInputChage} value={wallet.id == selectedId?selectedWalletName:""} />
												</div>
											</div>
										</div>	
									}

									{wallet.walletInstalled && wallet.wallet_address && 
										<div className={chooseClass(wallet, i)} onClick={() => chooseWallet(i)}>
											<div className="innerbox transparentbg">
												<div className="btn-close"><a href="#"><img src="/images/icon-line-close-black.png" /></a></div>
												<div className="box-img"><img src={mediaUrl+"wallet_logo/"+wallet.image} /></div>
												<div className="box-content">
													<div className="box-title">{wallet.wallet_name}</div>
												</div>
												<div className="hovercontent">
													<p><span>Network:</span><span><a href="#">Change to  polygon <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.13312 3.99328L3.81979 2.67995L1.67979 0.539951C1.22646 0.0932846 0.453125 0.413285 0.453125 1.05328V5.20662V8.94662C0.453125 9.58662 1.22646 9.90662 1.67979 9.45328L5.13312 5.99995C5.68646 5.45328 5.68646 4.54662 5.13312 3.99328Z" fill="#5129F1"/></svg></a></span></p>
													<p><span>{wallet.wallet_address}</span><span><a href="#"><img src="/images/icon-copy.svg" /></a></span></p>
												</div>
											</div>
										</div>
									}

								</div>
							)
						})
					}
					</div>
					{
						status &&
						<div className="col-sm-6">
							
						</div>
					}
				</div>
			</div>
		</div>
    )
}
export default WalletList;