import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChainId, DAppProvider } from "@usedapp/core";

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider
      config={{
        supportedChains: [ChainId.Kovan],
        notifications: {
          expirationPeriod: 1000,
          checkInterval: 1000,
        },
      }}
    >
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
