import React from "react";
import HorizontalSpacing from "../../../../../../common-ui/views/horizontal-spacing";
import { DigitSelect } from "@cthit/react-digit-components";

const ListPdpBar = (barState) => (
  <HorizontalSpacing>
    <h2>Hai!</h2>
    <DigitSelect
            filled
            upperLabel="This is a upperlabel"
            value={ barState.sortOrder }
            onChange={e => {
                barState.changeSortOrder(e);
            }}
        />
    <h1>Hi</h1>
  </HorizontalSpacing>
);

export default ListPdpBar;
