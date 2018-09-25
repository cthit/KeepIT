import React, { Component } from "react";
import { DigitProviders, DigitHeader } from "@cthit/react-digit-components";
import AddPuh from "../use-cases/add-puh";
import DrawerView from "../common/views/drawerView";

class App extends Component {
  render() {
    return (
      <DigitProviders>
        <DigitHeader
          title="KeepIT"
          renderMain={() => <AddPuh />}
          renderDrawer={() => <DrawerView />}
        />
      </DigitProviders>
    );
  }
}

export default App;
