from _pytest.config import exceptions
from scripts.deploy import deploy_token_farm_and_dapp_token
from scripts.helpful_scripts import LOCAL_BLOCKCHAIN_ENVIRONMENTS, get_account, get_contract, INITIAL_PRICE_FEED_VALUE
from brownie import network, exceptions
import pytest


def test_set_price_feed_contracts():
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip("Only for local testing!")
    token_farm, dapp_token = deploy_token_farm_and_dapp_token()
    account = get_account()
    non_owner_account = get_account(index=1)
    price_feed_address = get_contract(
        "eth_usd_price_feed"). address
    token_farm.setPriceFeedContract(
        dapp_token.address, price_feed_address, {"from": account})
    assert token_farm.tokenPriceFeedMapping(
        dapp_token.address) == price_feed_address
    with pytest.raises(exceptions.VirtualMachineError):
        token_farm.setPriceFeedContract(
            dapp_token.address, price_feed_address, {"from": non_owner_account})


def test_stake_tokens(amount_staked):
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip("Only for local testing!")
    account = get_account()
    token_farm, dapp_token = deploy_token_farm_and_dapp_token()
    price_feed_address = get_contract(
        "eth_usd_price_feed"). address
    token_farm.setPriceFeedContract(
        dapp_token.address, price_feed_address, {"from": account})
    # sending some dapp_token to the token_farm contract
    dapp_token.approve(token_farm.address, amount_staked, {"from": account})
    token_farm.stakeToken(
        amount_staked, dapp_token.address, {"from": account})
    assert token_farm.stakingBalance(
        dapp_token.address, account.address) == amount_staked
    assert token_farm.stakers(0) == account.address
    return token_farm, dapp_token


def test_issue_tokens(amount_staked):
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip("Only for local testing!")
    account = get_account()
    token_farm, dapp_token = test_stake_tokens(amount_staked)
    starting_balance = dapp_token.balanceOf(account.address)
    token_farm.issueToken({"from": account})
    """
     we are staking 1 dapp_token == 1 price in ETH
     so... we should get 2000 dapp_token as reward
     since the price of the eth is $2000 value
     """
    assert(
        dapp_token.balanceOf(
            account.address) == starting_balance + INITIAL_PRICE_FEED_VALUE
    )
