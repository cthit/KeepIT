import React, { Component } from "react";
import { DigitProviders, DigitHeader } from "@cthit/react-digit-components";
import ListPuh from "../use-cases/list-puh";
import DrawerView from "../common/views/drawerView";

class App extends Component {
  render() {
    return (
      <DigitProviders>
        <DigitHeader
          title="KeepIT"
          renderMain={() => <ListPuh />}
          renderDrawer={() => <DrawerView />}
        />
      </DigitProviders>
    );
  }
}

export default App;
