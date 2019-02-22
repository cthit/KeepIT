import React from "react";
import AddPuhElementView from "../add-puh-element-view";
import { DigitLayout } from "@cthit/react-digit-components";

export const AddPuhView = () => (
    <DigitLayout.Padding style={{ margin: "10px" }}>
        <AddPuhElementView />
    </DigitLayout.Padding>
);
