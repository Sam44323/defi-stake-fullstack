from _pytest.config import exceptions
from scripts.deploy import deploy_token_farm_and_dapp_token
from scripts.helpful_scripts import LOCAL_BLOCKCHAIN_ENVIRONMENTS, get_account, get_contract
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


def test_issue_tokens():
    pass
