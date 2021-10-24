from brownie import DappToken, TokenFarm
from scripts.helpful_scripts import get_account, get_contract, get_verify_status
from web3 import Web3
import yaml
import json

KEPT_BALANCE = Web3.toWei(100, "ether")


def deploy_token_farm_and_dapp_token(frontend_update=False):
    account = get_account()
    dapp_token = DappToken.deploy({"from": account})
    token_farm = TokenFarm.deploy(
        dapp_token.address, {"from": account}, publish_source=get_verify_status())

    # sending most of the dapp tokens to our token farm contract
    tx = dapp_token.transfer(
        token_farm.address, dapp_token.totalSupply() - KEPT_BALANCE, {"from": account})
    tx.wait(1)

    # adding allowed tokens to token farm contract
    # creating a dict with token addresses and their price feed contract data
    weth_token = get_contract('weth_token')
    fau_token = get_contract('fau_token')

    # for demo purpose we are using dapp token price as weth
    dict_of_allowed_tokens = {
        dapp_token: get_contract("dai_usd_price_feed"),
        weth_token: get_contract("dai_usd_price_feed"),
        fau_token: get_contract("eth_usd_price_feed")
    }
    add_allowed_tokens(token_farm, dict_of_allowed_tokens, account)
    if frontend_update:
        update_front_end()
    return token_farm, dapp_token


def add_allowed_tokens(token_farm, dict_of_allowed_tokens, account):
    for token in dict_of_allowed_tokens:
        tx = token_farm.addAllowedTokens(token.address, {"from": account})
        tx.wait(1)
        tx = token_farm.setPriceFeedContract(
            token.address, dict_of_allowed_tokens[token], {"from": account})
        tx.wait(1)
        print("Add tokens addresses for staking and their respective price-feeds!")


def update_front_end():
    # Sending our yaml config to frontend in JSON
    with open("brownie-config.yaml", "r") as brownie_config:
        # loading our yaml to the dict
        config_dict = yaml.load(brownie_config, Loader=yaml.FullLoader)

        # writing the dict as a JSON object in frontend
        with open('./front_end/src/brownie-config.json', "w") as brownie_config_json:
            json.dump(config_dict, brownie_config_json)
    print("Front end updated!")


def main():
    deploy_token_farm_and_dapp_token()
