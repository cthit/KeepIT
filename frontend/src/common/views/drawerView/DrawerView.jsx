import React from "react";
import {
  DigitLayout,
  DigitNavLink,
  DigitButton
} from "@cthit/react-digit-components";

export const DrawerView = () => (
  <div>
    <DigitLayout.Padding>
      <DigitButton text="New Puh" raised primary />
    </DigitLayout.Padding>
    <DigitNavLink link="/" text="digit" />
    <DigitNavLink link="/" text="prit" />
    <DigitNavLink link="/" text="styrit" />
    <DigitNavLink link="/" text="drawit" />
  </div>
);

export default DrawerView;
