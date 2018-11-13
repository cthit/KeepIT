import React from "react";
import HorizontalSpacing from "../../../../../../common-ui/views/horizontal-spacing";
import { Select } from "@material-ui/core";
import {
  SortFilterContainer,
  StyledListPdpBar,
  HorizontalLine
} from "./ListPdpBar.view.styles";

const ListPdpBar = barState => (
  <div>
    <HorizontalSpacing>
      <StyledListPdpBar>
        <Select
          filled
          upperLabel="This is a upperlabel"
          value={barState.sortOrder}
          onChange={e => {
            barState.changeSortOrder(e);
          }}
        />
      </StyledListPdpBar>
    </HorizontalSpacing>
    <HorizontalLine />
  </div>
);

export default ListPdpBar;
