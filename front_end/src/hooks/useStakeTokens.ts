import { useEthers } from "@usedapp/core";
import TokenFarm from "../chain-info/contracts/TokenFarm.json";
import mapConfig from "../chain-info/deployments/map.json";
import { constants } from "ethers";

const useStakeTokens = (tokenAddress: string) => {
  /**
   * section for approving or checking approve token in token-farm
   */
  const { chainId } = useEthers();
  const { abi } = TokenFarm;
  const tokenFarmAddress = chainId
    ? mapConfig[String(chainId) as "42"].TokenFarm[0]
    : constants.AddressZero;
};

export default useStakeTokens;
