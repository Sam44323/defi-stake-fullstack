// contracts/OurToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract OurToken is ERC20 {
    // wei
    constructor(uint256 initialSupply) ERC20("DappToken", "DTP") {
        _mint(msg.sender, initialSupply);
    }
}
