import React, { Component } from "react";
import {
  DigitProviders,
  DigitNavLink,
  DigitNavigation
} from "@cthit/react-digit-components";
import ListPuh from '../use-cases/list-puh'

class App extends Component {
  render() {
    return (
      <DigitProviders>
        <DigitNavigation
          title="KeepIT"
          renderMain={() => (
            <ListPuh />
          )}
          renderDrawer={() => (
            <div>
              <DigitNavLink link="/" text="digit" />
              <DigitNavLink link="/" text="prit" />
              <DigitNavLink link="/" text="styrit" />
              <DigitNavLink link="/" text="drawit" />
            </div>
          )}
        />
      </DigitProviders>
    );
  }
}

export default App;
