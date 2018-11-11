import React from "react";
import ListPuhElementView from "../list-puh-element-view";
import { ScrollView } from "./ListPuh.view.styles";

const ListPuhView = ({ active }) => (
  <ScrollView>
    {active.map(data => (
      <ListPuhElementView data={data} />
    ))}
  </ScrollView>
);
export default ListPuhView;
