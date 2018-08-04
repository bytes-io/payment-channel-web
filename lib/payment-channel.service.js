const ethereumjs = require('ethereumjs-util');
const abi = require('ethereumjs-abi');
const Web3 = require('web3');

const web3 = new Web3('http://127.0.0.1:7545');

exports.isValidSignature = function isValidSignature(
  contractAddress, amount, signature, expectedSigner
) {
  const message = prefixed(constructPaymentMessage(contractAddress, amount));
  const signer = recoverSigner(message, signature);
  return signer.toLowerCase()
    === ethereumjs.Util.stripHexPrefix(expectedSigner).toLowerCase();
};

// contractAddress is used to prevent cross-contract replay attacks.
// amount, in wei, specifies how much ether should be sent.
exports.signPayment = signPayment;
function signPayment(contractAddress, amount, address) {
  const message = constructPaymentMessage(contractAddress, amount);
  return signMessage(message, address);
}

// signPayment('0xcdd12b732e8f27f6d68fe4f1c890cb4a7d1e46747b700132c6b6e2ec95a63981', 0, '0xE13d5E66D14A679733B6e91a13557eB2531eB421')
//   .then(console.log);

function constructPaymentMessage(contractAddress, amount) {
  return abi.soliditySHA3(
    ['address', 'uint256'],
    [contractAddress, amount],
  );
}

function signMessage(message, address) {
  return web3.eth.sign(`0x${message.toString('hex')}`, address);
}

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
