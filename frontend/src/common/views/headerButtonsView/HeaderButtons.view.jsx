import React from "react";
import { DigitButton, DigitDesign } from "@cthit/react-digit-components";
import { ButtonContainer } from "./HeaderButtons.view.styles.jsx";
import { Switch, Route } from "react-router-dom";

export const HeaderButtons = props => (
    <div style={{ display: "flex" }}>
        <ButtonContainer>
            <Switch>
                <Route
                    path="/add"
                    component={() => (
                        <DigitDesign.Link to={"/"}>
                            <DigitButton text="List PDP" raised primary />
                        </DigitDesign.Link>
                    )}
                />
                <Route
                    path="/"
                    component={() => (
                        <DigitDesign.Link to={"/add"}>
                            <DigitButton text="Add PDP" raised primary />
                        </DigitDesign.Link>
                    )}
                />
            </Switch>
        </ButtonContainer>
        <ButtonContainer>
            <DigitButton text="Login" raised primary />
        </ButtonContainer>
    </div>
);

export default HeaderButtons;
