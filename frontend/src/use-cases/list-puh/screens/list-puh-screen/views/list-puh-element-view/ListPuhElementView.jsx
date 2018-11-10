import React from "react";
import {
  DigitDesign,
  DigitText,
  DigitButton
} from "@cthit/react-digit-components";
import {
  ListPuhElementViewSpacing,
  ListPuhElementViewMargin
} from "./ListPuhElementView.styles";
import HorizontalSpacing from "../../../../../../common-ui/views/horizontal-spacing";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

export const ListPuhElementView = ({ data }) => (
  <div>
    <DigitDesign.Card absHeight="100px">
      <ListPuhElementViewMargin>
        <HorizontalSpacing>
          <DigitText.Heading text={data.title} />
          <DigitText.Heading text={data.start} />
        </HorizontalSpacing>
        <HorizontalSpacing>
          <IconButton>
            <DeleteIcon />
          </IconButton>
          <DigitButton text="Details" primary raised />
        </HorizontalSpacing>
      </ListPuhElementViewMargin>
    </DigitDesign.Card>
    <ListPuhElementViewSpacing />
  </div>
);
