import React from "react";
import { Token } from "./Main";
import { useEthers, useTokenBalance } from "@usedapp/core";
import { formatUnits } from "@ethersproject/units";
import { Button, Input } from "@material-ui/core";

const StakeForm: React.FC<{ token: Token }> = ({ token }) => {
  const [amount, setAmount] = React.useState<number>(0);
  const { account } = useEthers();
  const { address, name } = token;
  const tokenBalance = useTokenBalance(address, account);
  const formattedBalance: number = tokenBalance
    ? parseFloat(formatUnits(tokenBalance, 18))
    : 0;
  console.log(amount);
  return (
    <>
      <Input
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
        type="number"
      />
      <Button color="primary" size="large" variant="contained">
        Stake
      </Button>
    </>
  );
};

export default StakeForm;
