/**
This very contract allows you to 
- stake tokens
- unstake tokens
- issueTokens i.e issue token rewards
- addAllowedTokens for adding token addresses thsn can be staked on the platform
- getEthValue which gives us the value in eth for the staked tokens on the platform
 */
// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

pragma solidity ^0.8.0;

contract TokenFarm is Ownable {
    address[] public allowedTokens;
    // for storing the staker amount data that's been staked
    /**
      mapping (token-address => mapping(user-address => amount))
     */
    mapping(address => mapping(address => uint256)) public stakingBalance;

    /**
  Function for staking tokens.
  _amount: amount of token you want to stake
  _token: contract address of the token that you want to stake
   */
    function stakeToken(uint256 _amount, address _token) public {
        require(_amount > 0, "Amount must me more than 0");
        require(
            tokenIsAllowed(_token),
            "The requested token is currently not allowed on the platform for staking!"
        );

        /** 
        using the transferFrom function for transfering the particular token,
        from the user address to the contract.

        Here we are using the IERC20(_token) because we are using the IERC20 interface to wrap the token address
        so that we can call the required functions for that token
        */
        IERC20(_token).transferFrom(msg.sender, address(this), _amount);

        // updating the staking value for the user based on the token address
        stakingBalance[_token][msg.sender] =
            stakingBalance[_token][msg.sender] +
            _amount;
    }

    /**
    Function that allows the admin to add address to the list of allowed tokens that can be staked
    _token: address for the token address to be allowed for staking
     */

    function addAllowedTokens(address _token) public onlyOwner {
        allowedTokens.push(_token);
    }

    /**
    Function that returns whether the token for given parameter address is allowed for staking or not
    _token: address of token for checking the status
     */
    function tokenIsAllowed(address _token) public view returns (bool) {
        for (
            uint256 allowedTokenIndex = 0;
            allowedTokenIndex < allowedTokens.length;
            allowedTokenIndex++
        ) {
            if (allowedTokens[allowedTokenIndex] == _token) {
                return true;
            }
        }
        return false;
    }
}
