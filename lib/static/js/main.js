// Import libraries we need.
import { default as Web3 } from 'web3';
import { default as contract } from 'truffle-contract';

import paymentChannelArtifacts from '../../../build/contracts/PaymentChannel.json';

const PaymentChannel = contract(paymentChannelArtifacts);
let accounts;
let account;

window.App = {
  start() {
    const self = this;

    PaymentChannel.setProvider(web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts((err, accs) => {
      if (err != null) {
        alert('There was an error fetching your accounts.');
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];

      self.refreshBalance();
    });
  },

  setStatus(message) {
    const status = document.getElementById('status');
    status.innerHTML = message;
  }
};

window.addEventListener('load', () => {
  if (typeof web3 !== 'undefined') {
    window.web3 = new Web3(web3.currentProvider);
  } else {
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));
  }

  App.start();
});
