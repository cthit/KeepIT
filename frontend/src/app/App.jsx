import React, { Component } from "react";
import { DigitProviders, DigitHeader } from "@cthit/react-digit-components";
import ListPuh from "../use-cases/list-puh";
import DrawerView from "../common/views/drawerView";
import { Switch, Route } from "react-router-dom"

class App extends Component {
  render() {
    return (
      <DigitProviders>
        <div>
          <DigitHeader
            title="KeepIT"
            renderMain={() => <ListPuh />}
            renderDrawer={() => <DrawerView />}
          />

          <Switch>
            <Route path="/" component={ListPuh}/>
            <Route path="/add" component={ListPuh}/>
          </Switch>
        </div>
      </DigitProviders>
    );
  }
}

export default App;
