import React, { Component } from "react";
import { DigitHeader } from "@cthit/react-digit-components";
import ListPuh from "../use-cases/list-puh";
import DrawerView from "../common/views/drawerView";
import { Switch, Route } from "react-router-dom";
import AddPuh from "../use-cases/add-puh";

class App extends Component {
  constructor(props) {
    super();
    props.loadAllPdp();
  }

  render() {
    const { failedLoadingPdp } = this.props;
    console.log(failedLoadingPdp);
    console.log("Window width: ");
    console.log(window.innerWidth);
    return (
      <div>
        {failedLoadingPdp}
        <DigitHeader
          dense
          title="KeepIT"
          renderMain={() => (
            <Switch>
              <Route path="/add" component={AddPuh} />
              <Route path="/" component={ListPuh} />
            </Switch>
          )}
          renderDrawer={null}
        />
      </div>
    );
  }
}

export default App;
