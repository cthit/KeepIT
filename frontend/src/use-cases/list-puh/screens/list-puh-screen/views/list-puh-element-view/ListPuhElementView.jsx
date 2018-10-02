import React from "react";
import { DigitDesign, DigitText, DigitButton, DigitLayout } from "@cthit/react-digit-components";
import { ListPuhElementViewSpacing, ListPuhElementViewMargin } from "./ListPuhElementView.styles";
import HorizontalSpacing from "../../../../../../common-ui/views/horizontal-spacing"
import DeleteIcon from "@material-ui/icons/Delete"
import IconButton from "@material-ui/core/IconButton"

export const ListPuhElementView = () => (
  <div>
    <DigitDesign.Card absHeight="100px">
      <ListPuhElementViewMargin>
        <HorizontalSpacing>
          <DigitText.Heading text="CM - Sittning Anmälan"/>
          <DigitText.Heading text="2012-04-23"/>
        </HorizontalSpacing>
        <HorizontalSpacing>
          <IconButton><DeleteIcon/></IconButton>
          <DigitButton text="Details" primary raised/>
        </HorizontalSpacing>
      </ListPuhElementViewMargin>
    </DigitDesign.Card>
    <ListPuhElementViewSpacing />
  </div>
);
