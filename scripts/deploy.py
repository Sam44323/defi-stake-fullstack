from brownie import DappToken, TokenFarm
from scripts.helpful_scripts import get_account, get_verify_status


def deploy_token_farm_and_dapp_token():
    account = get_account()
    dapp_token = DappToken.deploy({"from": account})
    token_farm = TokenFarm.deploy(
        dapp_token.address, {"from": account}, publish_source=get_verify_status())


def main():
    deploy_token_farm_and_dapp_token()
