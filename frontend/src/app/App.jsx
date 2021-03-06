import React, { Component } from "react";
import { DigitHeader } from "@cthit/react-digit-components";
import ListPuh from "../use-cases/list-puh";
import { Switch, Route } from "react-router-dom";
import AddPuh from "../use-cases/add-puh";
import HeaderButtons from "../common/views/headerButtonsView";

class App extends Component {
    constructor(props) {
        super();
        props.loadAllPdp();
    }

    render() {
        const { failedLoadingPdp } = this.props;
        console.log(failedLoadingPdp);
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
                    renderHeader={() => <HeaderButtons />}
                />
            </div>
        );
    }
}

export default App;
