import React from "react";
import ListPuhView from "./views/list-puh-view";
import DetailsPuhView from "./views/details-puh-view";
import {
  Space,
  BigSpace,
  FillContainer,
  ListPuhScreenContainer
} from "./ListPuhScreen.styles";
import HorizontalSpacing from "../../../../common-ui/views/horizontal-spacing";
import { DigitIfElseRendering } from "@cthit/react-digit-components";

export const ListPuhScreen = props => (
  <ListPuhScreenContainer>
    <DigitIfElseRendering
      test={window.innerWidth <= 1200}
      ifRender={() => (
        <div>
          <DigitIfElseRendering
            test={props.selected.exists}
            ifRender={() => <DetailsPuhView />}
          />

          <BigSpace />

          <FillContainer>
            <ListPuhView />
          </FillContainer>
        </div>
      )}
      elseRender={() => (
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
      )}
    />
  </ListPuhScreenContainer>
);
