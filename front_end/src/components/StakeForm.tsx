import React from "react";
import { Token } from "./Main";
import { useEthers, useTokenBalance } from "@usedapp/core";
import { formatUnits } from "@ethersproject/units";
import { Button, Input } from "@material-ui/core";
import useStakeTokens from "../hooks/useStakeTokens";
import { utils } from "ethers";

const StakeForm: React.FC<{ token: Token }> = ({ token }) => {
  const [amount, setAmount] = React.useState<number>(0);
  const { address } = token;
  const { approveTokenTransfer, approveErc20State } = useStakeTokens(address);
  const { account } = useEthers();
  const tokenBalance = useTokenBalance(address, account);
  const formattedBalance: number = tokenBalance
    ? parseFloat(formatUnits(tokenBalance, 18))
    : 0;

  const handleSubmit = () => {
    const amountToStakeInWei = utils.parseEther(amount.toString()).toString();
    approveTokenTransfer(amountToStakeInWei);
  };

  return (
    <>
      <Input
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
        type="number"
      />
      <Button
        color="primary"
        size="large"
        variant="contained"
        onClick={handleSubmit}
      >
        Stake
      </Button>
    </>
  );
};

export default StakeForm;
