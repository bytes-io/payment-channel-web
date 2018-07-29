import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'
import PaymentChannel from '../build/contracts/PaymentChannel.json'

const TESTRPC_HOST = 'localhost'
const TESTRPC_PORT = '7545'

function component () {
  var element = document.createElement('div')
  let provider = new Web3.providers.HttpProvider(`http://${TESTRPC_HOST}:${TESTRPC_PORT}`)
  let meta = contract(PaymentChannel)
  meta.setProvider(provider)
  meta.deployed()
    .then((instance) => { element.innerHTML = `PaymentChannel address: ${instance.address}` })

  return element
}

document.body.appendChild(component())
