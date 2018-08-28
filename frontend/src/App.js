import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  DigitProviders,
  DigitNavLink,
  DigitNavigation
} from "@cthit/react-digit-components";

class App extends Component {
  render() {
    return (
      <DigitProviders>
        <DigitNavigation
          title="KeepIT"
          renderMain={() => (
            <div>
              <h1>hej</h1>
            </div>
          )}
          renderDrawer={() => (
            <div>
              <DigitNavLink link="/" text="Test" />
            </div>
          )}
        />
      </DigitProviders>
    );
  }
}

export default App;
