import React from "react";
import ListPuhElementView from "../list-puh-element-view";
import List from "@material-ui/core/List";
import { DigitDesign } from "@cthit/react-digit-components";
import { ScrollView } from "./ListPuh.view.styles";

const style = {
  padding: "0px"
};

const ListPuhView = ({ active }) => (
  <DigitDesign.Card>
    <ScrollView>
      <List style={style} component="nav">
        {active.map(data => (
          <ListPuhElementView data={data} />
        ))}
      </List>
    </ScrollView>
  </DigitDesign.Card>
);
export default ListPuhView;
