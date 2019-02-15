import React from "react";
import { DigitButton, DigitDesign } from "@cthit/react-digit-components";
import { ButtonContainer } from "./HeaderButtons.view.styles.jsx";

export const HeaderButtons = props => (
    <div style={{ display: "flex" }}>
        <ButtonContainer>
            <DigitDesign.Link to={"/add"}>
                <DigitButton text="Add PDP" raised primary />
            </DigitDesign.Link>
        </ButtonContainer>
        <ButtonContainer>
            <DigitButton text="Login" raised primary />
        </ButtonContainer>
    </div>
);

export default HeaderButtons;