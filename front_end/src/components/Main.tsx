import React from "react";
import { useEthers } from "@usedapp/core";
import helperConfig from "../helper-config.json";
import mapConfig from "../chain-info/deployments/map.json";
import brownieConfig from "../brownie-config.json";
import { constants } from "ethers";

type NetworkIDS = 1 | 4 | 42 | 1337;

const Main: React.FC = () => {
  const { chainId } = useEthers();
  const networkName = chainId ? helperConfig[chainId as NetworkIDS] : "";
  /**
   * getting the contract addresses for Dapp-token and Token-Farm. If chainId is not present then use a constant zero address(0x0000...) from ethers
   */
  const dappTokenAddress = chainId
    ? mapConfig[String(chainId) as "42"].DappToken[0]
    : constants.AddressZero;
  const wethTokenAddress = chainId
    ? brownieConfig.networks[networkName as "kovan"].weth_token
    : constants.AddressZero;
  const fauTokenAddress = chainId
    ? brownieConfig.networks[networkName as "kovan"].fau_token
    : constants.AddressZero;
  const tokenFarmAddress = chainId
    ? mapConfig[String(chainId) as "42"].TokenFarm[0]
    : constants.AddressZero;
  return <></>;
};

export default Main;
