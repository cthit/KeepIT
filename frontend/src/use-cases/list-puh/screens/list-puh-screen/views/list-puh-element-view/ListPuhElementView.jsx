import React from "react";
import { DigitDesign, DigitText, DigitButton } from "@cthit/react-digit-components";
import { ListPuhElementViewSpacing, ListPuhElementViewMargin } from "./ListPuhElementView.styles";
import Space from "../../../../../../common-ui/views/space"

export const ListPuhElementView = () => (
  <div>
    <DigitDesign.Card absHeight="100px">
      <ListPuhElementViewMargin>
        <Space>
          <DigitText.Heading text="Some list pdp"/>
          <DigitText.Heading text="2018-02-05"/>
        </Space>
        <Space>
          <DigitButton raised secondary text="Remove"/>
          <DigitButton raised primary text="Details"/>
        </Space>
      </ListPuhElementViewMargin>
    </DigitDesign.Card>
    <ListPuhElementViewSpacing />
  </div>
);
