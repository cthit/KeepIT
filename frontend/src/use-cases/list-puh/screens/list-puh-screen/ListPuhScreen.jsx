import React from 'react'
import ListPuhView from './views/list-puh-view'
import DetailsPuhView from "./views/details-puh-view"
import { Space, FillContainer, VR } from "./ListPuhScreen.styles"
import HorizontalSpacing from "../../../../common-ui/views/horizontal-spacing"

export const ListPuhScreen = () =>
    <HorizontalSpacing>
        <FillContainer>
            <ListPuhView />
        </FillContainer>
        <Space />
        <FillContainer>
            <DetailsPuhView />
        </FillContainer>
    </HorizontalSpacing>