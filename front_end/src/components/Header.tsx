import React from "react";
import { useEthers } from "@usedapp/core";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4),
    display: "flex",
    justifyContent: "flex-end",
    gap: theme.spacing(1),
  },
}));

const Header: React.FC = () => {
  const classes = useStyles();
  const { account, activateBrowserWallet, deactivate } = useEthers();
  console.log(account);
  return (
    <div className={classes.container}>
      {account ? (
        <Button color="primary" onClick={deactivate} variant="contained">
          Disconnect
        </Button>
      ) : (
        <Button
          color="primary"
          onClick={() => activateBrowserWallet()}
          variant="contained"
        >
          Connect
        </Button>
      )}
    </div>
  );
};

export default Header;
