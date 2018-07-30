const PaymentChannel = artifacts.require('./PaymentChannel.sol');

async function openValidChannel(channel, sender, recipient) {
  const deposit = web3.toWei('5', 'ether');
  // setup
}

const now = new Date();
const twoHoursLater = new Date(now.getTime() + (2 * 1000 * 60 * 60)).getTime() / 1000;

contract('PaymentChannel', (accounts) => {
  describe('openChannel', () => {
    it('opens a channel between accounts[0] and accounts[1]', async () => {
      const channel = await PaymentChannel.new();
      openValidChannel(channel, accounts[0], twoHoursLater);
    });
  });
});
