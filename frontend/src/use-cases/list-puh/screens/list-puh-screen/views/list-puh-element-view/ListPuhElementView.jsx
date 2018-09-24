import React from "react";
import { DigitDesign, DigitText, DigitButton } from "@cthit/react-digit-components";
import { ListPuhElementViewSpacing, ListPuhElementViewMargin } from "./ListPuhElementView.styles";
import HorizontalSpacing from "../../../../../../common-ui/views/horizontal-spacing"

export const ListPuhElementView = () => (
  <div>
    <DigitDesign.Card absHeight="100px">
      <ListPuhElementViewMargin>
        <HorizontalSpacing>
          <DigitText.Heading text="Some list pdp"/>
          <DigitText.Heading text="2018-02-05"/>
        </HorizontalSpacing>
        <HorizontalSpacing>
          <DigitButton outline text="Remove"/>
          <DigitButton raised primary text="Details"/>
        </HorizontalSpacing>
      </ListPuhElementViewMargin>
    </DigitDesign.Card>
    <ListPuhElementViewSpacing />
  </div>
);
