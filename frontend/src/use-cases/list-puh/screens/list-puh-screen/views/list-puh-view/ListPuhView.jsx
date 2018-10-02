import React from "react";
import ListPuhElementView from "../list-puh-element-view";
import { ScrollView } from "./ListPuhView.styles";

const ListPuhView = ({ active }) => (
  <ScrollView>
    {active.map(data => (
      <ListPuhElementView data={data} />
    ))}
  </ScrollView>
);

export default ListPuhView;
