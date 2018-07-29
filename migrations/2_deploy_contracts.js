const PaymentChannel = artifacts.require('./PaymentChannel.sol');

const now = new Date();
const twoHoursLater = new Date(now.getTime() + (2 * 1000 * 60 * 60)).getTime() / 1000;

module.exports = function (deployer, network, accounts) {
  console.log(accounts, twoHoursLater)
  deployer.deploy(PaymentChannel, accounts[0], twoHoursLater);
};
