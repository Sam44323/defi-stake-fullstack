import React from "react";
import { useEthers } from "@usedapp/core";
import helperConfig from "../helper-config.json";
import mapConfig from "../chain-info/deployments/map.json";
import brownieConfig from "../brownie-config.json";
import { constants } from "ethers";
import YourWallet from "./YourWallet";
import { dai, dapp, eth } from "../assets/index";
import { makeStyles } from "@material-ui/core";

type NetworkIDS = 1 | 4 | 42 | 1337;

export type Token = {
  image: string;
  address: string;
  name: string;
};

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.common.white,
    textAlign: "center",
    padding: theme.spacing(4),
  },
}));

const Main: React.FC = () => {
  const { chainId } = useEthers();
  const networkName = chainId ? helperConfig[chainId as NetworkIDS] : "";
  const classes = useStyles();
  /**
   * getting the contract addresses for all tokens and Token-Farm contract. If network is not kovan is not present then use a constant zero address(0x0000...) from ethers
   */
  const dappTokenAddress =
    networkName === "kovan"
      ? mapConfig[String(chainId) as "42"].DappToken[0]
      : constants.AddressZero;
  const wethTokenAddress =
    networkName === "kovan"
      ? brownieConfig.networks[networkName as "kovan"].weth_token
      : constants.AddressZero;
  const fauTokenAddress =
    networkName === "kovan"
      ? brownieConfig.networks[networkName as "kovan"].fau_token
      : constants.AddressZero;
  const tokenFarmAddress =
    networkName === "kovan"
      ? mapConfig[String(chainId) as "42"].TokenFarm[0]
      : constants.AddressZero;

  const supportedTokens: Array<Token> = [
    {
      image: dapp,
      address: dappTokenAddress,
      name: "DAPP",
    },
    {
      image: dai,
      address: fauTokenAddress,
      name: "DAI",
    },
    {
      image: eth,
      address: wethTokenAddress,
      name: "WETH",
    },
  ];
  return (
    <>
      <h2 className={classes.title}>Dapp Token App</h2>
      <YourWallet supportedTokens={supportedTokens} />
    </>
  );
};

export default Main;
