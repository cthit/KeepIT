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
                            <SensitiveText>
                                Includes sensitive information!
                            </SensitiveText>
                        </DigitLayout.Center>
                    )}
                />
                <Indent>
                    <HorizontalSpacing>
                        <DigitText.Text
                            text={"From: " + formatDate(selected.start)}
                        />
                        <DigitText.Text
                            text={"To: " + formatDate(selected.end)}
                        />
                    </HorizontalSpacing>
                </Indent>
                <DigitDesign.Divider />
                <Indent>
                    <DigitText.Text text={selected.eula} />
                </Indent>
                <DigitDesign.Divider />
                <Indent>
                    <DigitText.Text
                        text={"Created By: " + selected.creator.nick}
                    />
                    <DigitText.Text
                        text={"In committee: " + selected.committee}
                    />
                    <DigitText.Text
                        text={"Chairman: " + selected.chairman.nick}
                    />
                    <DigitText.Text
                        text={"Target group: " + selected.targetGroup}
                    />
                    <DigitText.Text
                        text={"Last edited: " + formatDate(selected.lastEdit)}
                    />
                </Indent>
            </Padding>
        </DigitDesign.Card>
    </DetailsPuhViewContainer>
);

function formatDate(date) {
    var day = date.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    var month = date.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    return date.getFullYear() + "-" + month + "-" + day;
}
