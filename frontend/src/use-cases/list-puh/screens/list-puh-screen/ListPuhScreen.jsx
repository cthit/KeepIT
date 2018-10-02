import React from 'react'
import ListPuhView from './views/list-puh-view'
import DetailsPuhView from "./views/details-puh-view"
import { Space, FillContainer, ListPuhScreenContainer } from "./ListPuhScreen.styles"
import HorizontalSpacing from "../../../../common-ui/views/horizontal-spacing"

export const ListPuhScreen = () =>
    <ListPuhScreenContainer>
        <HorizontalSpacing>
            <FillContainer>
                <ListPuhView />
            </FillContainer>
            <Space />
            <FillContainer>
                <DetailsPuhView />
            </FillContainer>
        </HorizontalSpacing>
    </ListPuhScreenContainer>