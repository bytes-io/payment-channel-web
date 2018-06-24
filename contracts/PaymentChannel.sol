// solhint-disable-line compiler-fixed, compiler-gt-0_4
pragma solidity ^0.4.21;

import "./PaymentChannelInterface.sol";


contract PaymentChannel is PaymentChannelInterface {
  function PaymentChannel(address _recipient, uint256 _expiry) public {
    sender = msg.sender;
    recipient = _recipient;
    expiry = _expiry;
  }

  function close(uint256 amount, bytes signature) public {
    require(recipient == msg.sender);
    require(isValidSignature(amount, signature));

    recipient.transfer(amount);
    selfdestruct(sender);
  }

  function isValidSignature(uint256 amount, bytes signature) internal view returns (bool) {
    bytes32 message = prefixed(keccak256(this, amount));

    // Check that the signature is from the payment sender.
    return recoverSigner(message, signature) == sender;
  }

  function recoverSigner(bytes32 message, bytes sig) internal pure returns (address) {
    uint8 v;
    bytes32 r;
    bytes32 s;

    (v, r, s) = splitSignature(sig);

    return ecrecover(message, v, r, s);
  }

  function splitSignature(bytes sig) internal pure returns (uint8, bytes32, bytes32) {
    require(sig.length == 65);

    bytes32 r;
    bytes32 s;
    uint8 v;

    assembly {
      // first 32 bytes, after the length prefix
      r := mload(add(sig, 32))
      // second 32 bytes
      s := mload(add(sig, 64))
      // final byte (first byte of the next 32 bytes)
      v := byte(0, mload(add(sig, 96)))
    }

    return (v, r, s);
  }

  function prefixed(bytes32 hash) internal pure returns (bytes32) {
    return keccak256("\x19Ethereum Signed Message:\n32", hash);
  }
}
