// solhint-disable-next-line compiler-fixed, compiler-gt-0_4
pragma solidity ^0.4.21;


contract PaymentChannelInterface {
  address public sender;
  address public recipient;
  uint256 public expiry;

  function close(uint256 amount, bytes signature) public;
}
