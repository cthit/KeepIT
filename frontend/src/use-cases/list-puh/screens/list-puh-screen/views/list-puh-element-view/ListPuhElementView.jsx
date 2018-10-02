import React from "react";
import { DigitDesign, DigitText } from "@cthit/react-digit-components";
import { ListPuhElementViewSpacing } from "./ListPuhElementView.styles";

export const ListPuhElementView = () => (
  <div>
    <DigitDesign.Card absHeight="200px">
      <DigitText.Text text="This is a PUH for the selected committe, someNick, someCid, somePersonalSequirityNumber, someAddress, somePhoneNumber, I HOPE NOBODY SEES THIS!" />
    </DigitDesign.Card>
    <ListPuhElementViewSpacing />
  </div>
);
