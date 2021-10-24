import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "inline-grid",
    gridTemplateColumns: "auto auto auto",
    gap: theme.spacing(1),
    alignItems: "center",
  },
  tokenImg: {
    width: "32px",
  },
  amount: {
    fontWeight: 700,
  },
}));

interface BalanceMsgProps {
  label: string;
  tokenImg: string;
  amount: number;
}

const BalanceMsg: React.FC<BalanceMsgProps> = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div>{props.label}</div>
      <div className={classes.amount}>{props.amount}</div>
      <img className={classes.tokenImg} src={props.tokenImg} alt="token-logo" />
    </div>
  );
};

export default BalanceMsg;
