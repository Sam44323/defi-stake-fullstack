import React from "react";
import { useEthers } from "@usedapp/core";

const Header: React.FC = () => {
  const { account, activateBrowserWallet, deactivate } = useEthers();
  return (
    <div>
      {account ? (
        <button color="primary" onClick={deactivate}>
          Disconnect
        </button>
      ) : (
        <button color="primary" onClick={() => activateBrowserWallet()}>
          Connect
        </button>
      )}
    </div>
  );
};

export default Header;
