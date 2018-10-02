import React from "react"
import { DigitDesign, DigitText, DigitLayout } from "@cthit/react-digit-components"
import Padding from "../../../../../../common-ui/views/padding"
import HorizontalSpacing from "../../../../../../common-ui/views/horizontal-spacing"
import { DetailsPuhViewContainer, Indent, SensitiveText } from "./DetailsPuhView.styles";
import IconButton from "@material-ui/core/IconButton"
import EditIcon from "@material-ui/icons/Edit"

export const DetailsPuhView = () => (
    <DetailsPuhViewContainer>
        <DigitDesign.Card>
            <Padding>
                <DigitLayout.Center>
                    <DigitText.Heading text="CM-sittning anmälan" />
                </DigitLayout.Center>
                <DigitLayout.Center>
                    <SensitiveText> 
                        Includes sensitive information! 
                    </SensitiveText>
                </DigitLayout.Center>
                <Indent>
                    <HorizontalSpacing>
                        <DigitText.Text text="From: 2012-04-23" />
                        <DigitText.Text text="To: 2013-04-23" />
                    </HorizontalSpacing>
                </Indent>
                <DigitDesign.Divider />
                <Indent>
                    <DigitText.Text text="The data collected will be used to determine the space and inventory needed for the event. It will also be used to contact you in case of changes. The infomration will be shared with all members of digIT and the sections DPO's in purpose of controlling complience." />
                </Indent>
                <DigitDesign.Divider />
                <Indent>
                    <DigitText.Text text="Target group: All section members"/>
                    <DigitText.Text text="Last edited on: 2013-05-23 18:25:43"/>
                </Indent>
            </Padding>
        </DigitDesign.Card>
    </DetailsPuhViewContainer>
);