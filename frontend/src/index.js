import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import registerServiceWorker from "./registerServiceWorker";
import { DigitProviders } from "@cthit/react-digit-components";
import { rootReducer } from "./app/App.reducer";
import { Route } from "react-router";

ReactDOM.render(
    <DigitProviders rootReducer={{ root: rootReducer }}>
        <Route component={App} />
    </DigitProviders>,
    document.getElementById("root")
);
registerServiceWorker();
