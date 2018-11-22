import React from "react";
import { DigitText, DigitCheckbox } from "@cthit/react-digit-components";
import {
  StyledListItem,
  Horizontal,
  VerticalCenter
} from "./ListPuhElementView.styles";
import HorizontalSpacing from "../../../../../../common-ui/views/horizontal-spacing";

export const ListPuhElementView = props => (
  <div>
    <StyledListItem
      buttonx
      selected={props.current.data.id === props.selected.id}
      onClick={() => {
        props.selectPdp(props.data);
      }}
    >
      <HorizontalSpacing>
        <Horizontal>
          <DigitCheckbox primary />
          <VerticalCenter>
            <DigitText.Subtitle text={props.current.data.title} />
          </VerticalCenter>
        </Horizontal>
        <DigitText.Text text={props.current.data.start} />
      </HorizontalSpacing>
    </StyledListItem>
  </div>
);

export default ListPuhElementView;
