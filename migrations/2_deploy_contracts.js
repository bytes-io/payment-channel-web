const PaymentChannelInterface = artifacts.require("./PaymentChannelInterface.sol");
const PaymentChannel = artifacts.require("./PaymentChannel.sol");

module.exports = function(deployer) {
  deployer.deploy(PaymentChannelInterface);
  deployer.link(PaymentChannelInterface, PaymentChannel);
  deployer.deploy(PaymentChannel);
};
