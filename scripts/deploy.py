from brownie import DappToken, TokenFarm
from scripts.helpful_scripts import get_account, get_verify_status
from web3 import Web3

KEPT_BALANCE = Web3.toWei(100, "ether")


def deploy_token_farm_and_dapp_token():
    account = get_account()
    dapp_token = DappToken.deploy({"from": account})
    token_farm = TokenFarm.deploy(
        dapp_token.address, {"from": account}, publish_source=get_verify_status())

    # sending most of the dapp tokens to our token farm contract
    tx = dapp_token.transfer(
        token_farm.address, dapp_token.totalSupply() - KEPT_BALANCE, {"from": account})
    tx.wait(1)


def main():
    deploy_token_farm_and_dapp_token()
