import React from "react";
import {
  DigitDesign,
  DigitText,
  DigitLayout,
  DigitIfElseRendering
} from "@cthit/react-digit-components";
import Padding from "../../../../../../common-ui/views/padding";
import HorizontalSpacing from "../../../../../../common-ui/views/horizontal-spacing";
import {
  DetailsPuhViewContainer,
  Indent,
  SensitiveText
} from "./DetailsPuhView.styles";

export const DetailsPuhView = ({ selected }) => (
  <DetailsPuhViewContainer>
    <DigitDesign.Card>
      <Padding>
        <DigitLayout.Center>
          <DigitText.Title text={selected.title} />
        </DigitLayout.Center>
        <DigitIfElseRendering
          test={selected.sensitive}
          ifRender={() => (
            <DigitLayout.Center>
              <SensitiveText>Includes sensitive information!</SensitiveText>
            </DigitLayout.Center>
          )}
        />
        <Indent>
          <HorizontalSpacing>
            <DigitText.Text text={"From: " + selected.start} />
            <DigitText.Text text={"To: " + selected.end} />
          </HorizontalSpacing>
        </Indent>
        <DigitDesign.Divider />
        <Indent>
          <DigitText.Text text={selected.eula} />
        </Indent>
        <DigitDesign.Divider />
        <Indent>
          <DigitText.Text text={"Created By: " + selected.creator.nick} />
          <DigitText.Text text={"Chairman: " + selected.chairman.nick} />
          <DigitText.Text text={"Target group: " + selected.targetGroup} />
          <DigitText.Text text={"Last edited: " + selected.lastEdit} />
        </Indent>
      </Padding>
    </DigitDesign.Card>
  </DetailsPuhViewContainer>
);
