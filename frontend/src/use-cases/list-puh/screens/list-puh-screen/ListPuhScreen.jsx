import React from "react";
import ListPuhView from "./views/list-puh-view";
import DetailsPuhView from "./views/details-puh-view";
import {
    BigSpace,
    FillContainer,
    ListPuhScreenContainer,
    KeepITGridItem
} from "./ListPuhScreen.styles";
import { WindowContainer, KeepITGrid } from "./ListPuhScreen.styles";
import { DigitIfElseRendering } from "@cthit/react-digit-components";

export const ListPuhScreen = props => (
    <ListPuhScreenContainer>
        <DigitIfElseRendering
            test={props.selected.exists}
            ifRender={() => (
                <KeepITGrid>
                    <KeepITGridItem>
                        <DetailsPuhView />
                    </KeepITGridItem>
                    <KeepITGridItem>
                        <FillContainer>
                            <ListPuhView />
                        </FillContainer>
                    </KeepITGridItem>
                </KeepITGrid>
            )}
            elseRender={() => (
                <WindowContainer>
                    <BigSpace />
                    <FillContainer>
                        <ListPuhView />
                    </FillContainer>
                </WindowContainer>
            )}
        />
    </ListPuhScreenContainer>
);
