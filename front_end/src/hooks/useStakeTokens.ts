import { useEthers, useContractFunction } from "@usedapp/core";
import TokenFarm from "../chain-info/contracts/TokenFarm.json";
import ERC20 from "../chain-info/contracts/dependencies/OpenZeppelin/openzeppelin-contracts@4.2.0/ERC20.json";
import mapConfig from "../chain-info/deployments/map.json";
import { constants, utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { useState, useEffect } from "react";

const useStakeTokens = (tokenAddress: string) => {
  // Token Farm Contract
  const { chainId } = useEthers();
  const { abi } = TokenFarm;
  const tokenFarmAddress = chainId
    ? mapConfig[String(chainId) as "42"].TokenFarm[0]
    : constants.AddressZero;
  const tokenFarmInterface = new utils.Interface(abi);
  const tokenFarmContract = new Contract(tokenFarmAddress, tokenFarmInterface);

  // Token Contract Section
  const erc20Interface = new utils.Interface(ERC20.abi);
  const tokenContract = new Contract(tokenAddress, erc20Interface);
  const { send: approveErc20Send, state: approveErc20State } =
    useContractFunction(tokenContract, "approve", {
      transactionName: "Approve ERC20 transfer",
    });
  const approveTokenTransferAndStake = (amount: string) => {
    setAmountToStake(amount.toString());
    return approveErc20Send(tokenFarmAddress, amount);
  };

  // logic for staking a token
  const { send: stakeErc20Send, state: stakeErc20State } = useContractFunction(
    tokenFarmContract,
    "stakeToken",
    {
      transactionName: "Stake tokens",
    }
  );

  const [state, setState] = useState(approveErc20State);
  const [amountToStake, setAmountToStake] = useState<string>("");

  useEffect(() => {
    if (approveErc20State.status === "Success") {
      stakeErc20Send();
    }
  }, [approveErc20State, stakeErc20Send]);

  return { approveTokenTransferAndStake, approveErc20State };
};

export default useStakeTokens;
