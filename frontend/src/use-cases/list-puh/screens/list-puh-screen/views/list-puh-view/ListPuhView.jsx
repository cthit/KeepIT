import React from "react";
import ListPuhElementView from "../list-puh-element-view";
import { DigitLayout } from "@cthit/react-digit-components";

export const ListPuhView = () => (
  <DigitLayout.Padding>
    <ListPuhElementView />
    <ListPuhElementView />
  </DigitLayout.Padding>
);
