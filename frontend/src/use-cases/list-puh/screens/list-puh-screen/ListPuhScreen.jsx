import React from "react";
import ListPuhView from "./views/list-puh-view";
import DetailsPuhView from "./views/details-puh-view";
import {
  Space,
  FillContainer,
  ListPuhScreenContainer
} from "./ListPuhScreen.styles";
import HorizontalSpacing from "../../../../common-ui/views/horizontal-spacing";
import { DigitIfElseRendering, DigitText } from "@cthit/react-digit-components";

export const ListPuhScreen = props => (
  <ListPuhScreenContainer>
    <HorizontalSpacing>
      <FillContainer>
        <ListPuhView />
      </FillContainer>
      <Space />

      <DigitIfElseRendering
        test={props.selected.exists}
        ifRender={() => (
          <FillContainer>
            <DetailsPuhView />
          </FillContainer>
        )}
      />
    </HorizontalSpacing>
  </ListPuhScreenContainer>
);
