const HDWalletProvider = require('truffle-hdwallet-provider');
const fs = require('fs');

// First read in the secrets.json to get our mnemonic
let secrets;
let mnemonic;
if (fs.existsSync('secrets.json')) {
  secrets = JSON.parse(fs.readFileSync('secrets.json', 'utf8'));
  mnemonic = secrets.mnemonic;
} else {
  console.log('No secrets.json found. If you are trying to publish EPM '
    + 'this will fail. Otherwise, you can ignore this message!');
  mnemonic = '';
}

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*', // match any network
    },
    live: {
      network_id: 1, // Ethereum public network
      // optional config values
      // host - defaults to 'localhost'
      // port - defaults to 8545
      // gas
      // gasPrice
      // from - default address to use for any transaction Truffle makes during migrations
    },
    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, 'https://ropsten.infura.io'),
      network_id: '3',
    },
    coverage: {
      host: 'localhost',
      network_id: '*',
      port: 8555,
      gas: 0xfffffffffff,
      gasPrice: 0x01,
    },
  },
};
