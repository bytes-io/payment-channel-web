const abi = require('ethereumjs-abi');
const ethereumjs = require('ethereumjs-util');
const web3 = require('web3');

function constructPaymentMessage(contractAddress, amount) {
  return abi.soliditySHA3(
    ['address', 'uint256'],
    [contractAddress, amount],
  );
}

function signMessage(message, callback) {
  web3.personal.sign(`0x${message.toString('hex')}`, web3.eth.defaultAccount,
    callback);
}

// contractAddress is used to prevent cross-contract replay attacks.
// amount, in wei, specifies how much ether should be sent.
function signPayment(contractAddress, amount, callback) {
  const message = constructPaymentMessage(contractAddress, amount);
  signMessage(message, callback);
}


console.log(constructPaymentMessage('0xE13d5E66D14A679733B6e91a13557eB2531eB421', 100));


function prefixed(hash) {
  return ethereumjs.ABI.soliditySHA3(
    ['string', 'bytes32'],
    ['\x19Ethereum Signed Message:\n32', hash],
  );
}

function recoverSigner(message, signature) {
  const split = ethereumjs.Util.fromRpcSig(signature);
  const publicKey = ethereumjs.Util.ecrecover(message, split.v, split.r, split.s);
  const signer = ethereumjs.Util.pubToAddress(publicKey).toString('hex');
  return signer;
}

function isValidSignature(contractAddress, amount, signature, expectedSigner) {
  const message = prefixed(constructPaymentMessage(contractAddress, amount));
  const signer = recoverSigner(message, signature);
  return signer.toLowerCase()
    === ethereumjs.Util.stripHexPrefix(expectedSigner).toLowerCase();
}
