const sendTrc20 = async(amount, walletAddress) => {
    const contractWalletAddress = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
    // const contractWalletAddress = "TXYZopYRdj2D9XRtbG411XZZ3kM5VkAeBf";
    const receiverAddress = "TJ4jSwMBREYysPQcjATTy52AXdXrdVXhM2";

    const tronWeb = window.tronWeb;
    const { abi } = await tronWeb.trx.getContract(contractWalletAddress);
    const usdtContract = tronWeb.contract(abi.entrys, contractWalletAddress);
    const balance = await usdtContract.methods.balanceOf(walletAddress).call();
    const walletBalance = Number(balance) / 1000000;
    console.log("balance : ", walletBalance);
    if(amount*1 > walletBalance) {
        alert("Wallet balance hasn't enough money");
        return;
    }

    var senderAddress = walletAddress;
    var _amount = amount * 1000000;

    var parameter = [{type:'address',value:receiverAddress},{type:'uint256',value:_amount}];
    var options = {
        feeLimit:100000000                    
    };

    const transactionObject = await tronWeb.transactionBuilder.triggerSmartContract(
        tronWeb.address.toHex(contractWalletAddress), 
        "transfer(address,uint256)", 
        options, 
        parameter,
        tronWeb.address.toHex(senderAddress)
    );

    var signedTransaction = await tronWeb.trx.sign(transactionObject.transaction);
    var broadcastTransaction = await tronWeb.trx.sendRawTransaction(signedTransaction);
    return broadcastTransaction;
}

const shortenAddressString = (address, length) => {
    if(address == null) {
        return address;
    }
    let newString = '';
    if(address.length > length){
        newString = address.substr(0 , length) + "...";   
    }else{
        newString = address;
    }
    return newString;
}

const shortenAddress = (address) => {
    let newString = '';
    if(address.length <= 10){
        newString = address;
    }else{
        newString = address.substr(0 , 5) + "..." + address.substr(-5, 5);
    }
    return newString;
}

const validNumber = (number) => {
    let status = false;
    const re = /^-?\d+(?:[.,]\d*?)?$/;
    if (number === '' || re.test(number)) {
       status = true;
    }
    return status;
}

export {sendTrc20, shortenAddressString, shortenAddress, validNumber}