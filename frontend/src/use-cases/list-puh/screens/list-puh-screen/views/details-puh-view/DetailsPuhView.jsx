import React from "react";
import {
    DigitDesign,
    DigitText,
    DigitLayout,
    DigitIfElseRendering,
    DigitButton
} from "@cthit/react-digit-components";
import Padding from "../../../../../../common-ui/views/padding";
import HorizontalSpacing from "../../../../../../common-ui/views/horizontal-spacing";
import {
    DetailsPuhViewContainer,
    Indent,
    SensitiveText,
    ParallelText
} from "./DetailsPuhView.styles";

export const DetailsPuhView = props => (
    <DetailsPuhViewContainer>
        <DigitDesign.Card>
            <Padding>
                <DigitLayout.Center>
                    <DigitText.Title text={props.selected.title} />
                </DigitLayout.Center>
                <DigitIfElseRendering
                    test={props.selected.sensitive}
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
                            text={"From: " + formatDate(props.selected.start)}
                        />
                        <DigitText.Text
                            text={"To: " + formatDate(props.selected.end)}
                        />
                    </HorizontalSpacing>
                </Indent>
                <DigitDesign.Divider />
                <Indent>
                    <DigitText.Text text={props.selected.eula} />
                </Indent>
                <DigitDesign.Divider />

                <Indent>
                    <ParallelText>
                        <DigitText.Text
                            text={"Created By: " + props.selected.creator.nick}
                        />
                        <DigitText.Text
                            text={"For committee: " + props.selected.committee}
                        />
                    </ParallelText>
                    <ParallelText>
                        <DigitText.Text
                            text={"Target group: " + props.selected.targetGroup}
                        />
                        <DigitText.Text
                            text={"Chairman: " + props.selected.chairman.nick}
                        />
                    </ParallelText>
                    <ParallelText>
                        <DigitText.Text
                            text={
                                "Last edited: " +
                                formatDate(props.selected.lastEdit)
                            }
                        />
                        <DigitDesign.Link to="/add">
                            <DigitButton
                                text="Edit"
                                primary
                                raised
                                onClick={() => props.EditPdp(props.selected)}
                            />
                        </DigitDesign.Link>
                    </ParallelText>
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
