import { default as Web3 } from 'web3';
import { default as contract } from 'truffle-contract';
import PaymentChannelContract from '../../build/contracts/PaymentChannel.json';

const TESTRPC_HOST = 'localhost';
const TESTRPC_PORT = '7545';

function component() {
  const element = document.createElement('div');
  const provider = new Web3.providers.HttpProvider(`http://${TESTRPC_HOST}:${TESTRPC_PORT}`);
  const meta = contract(PaymentChannelContract);
  meta.setProvider(provider);
  meta.deployed()
    .then((instance) => { element.innerHTML = ` address: ${instance.address}` });

  return element;
}

document.body.appendChild(component());
