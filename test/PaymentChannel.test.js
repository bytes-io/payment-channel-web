const PaymentChannel = artifacts.require('./PaymentChannel.sol');

async function openValidChannel(channel, sender, recipient) {
  const deposit = web3.toWei('5', 'ether');
  // setup
}

contract('PaymentChannel', (accounts) => {
  describe('openChannel', () => {
    it('opens a channel between accounts[0] and accounts[1]', async () => {
      const channel = await PaymentChannel.new();
    });
  });
});
