import React, { Component } from "react";
import { DigitProviders, DigitHeader } from "@cthit/react-digit-components";
import ListPuh from "../use-cases/list-puh";
import DrawerView from "../common/views/drawerView";
import { Switch, Route } from "react-router-dom"
import AddPuh from "../use-cases/add-puh";

class App extends Component {
  render() {
    return (
      <DigitProviders>
        <div>
          <DigitHeader
            title="KeepIT"
            renderMain={() => 
              <Switch>
                <Route path="/add" component={AddPuh}/>
                <Route path="/" component={ListPuh}/>
              </Switch>
            }
            renderDrawer={() => <DrawerView />}
          />

        </div>
      </DigitProviders>
    );
  }
}

export default App;
