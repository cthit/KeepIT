import React from 'react'
import ListPuhView from './views/list-puh-view'
import Space from "../../../../common-ui/views/space"
import Padding from "../../../../common-ui/views/padding"
import { DigitDesign } from "@cthit/react-digit-components"
import DetailsPuhView from "./views/details-puh-view"

export const ListPuhScreen = () =>
    <Space>
        <ListPuhView />
        <Padding>
            <DigitDesign.Card text="Derp" absWidth="5px" absHeight="100vh" />
        </Padding>
        <DetailsPuhView/>
    </Space>