import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import registerServiceWorker from "./registerServiceWorker";
import { DigitProviders } from "@cthit/react-digit-components";
import { rootReducer } from "./app/App.reducer";

ReactDOM.render(
  <DigitProviders rootReducer={{ root: rootReducer }}>
    <App />
  </DigitProviders>,
  document.getElementById("root")
);
registerServiceWorker();
