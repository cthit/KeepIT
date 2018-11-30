import React from "react";
import HorizontalSpacing from "../../../../../../common-ui/views/horizontal-spacing";
import {
  StyledListPdpBar,
  HorizontalLine,
  StyledSelect,
  StyledFormControl,
  StyledInputLabel
} from "./ListPdpBar.view.styles";
import { DigitCheckbox, DigitMenuItem } from "@cthit/react-digit-components";
import {
  OutlinedInput,
  MenuItem,
  Checkbox,
  ListItemText,
  InputLabel,
  FormControl
} from "@material-ui/core";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250
    }
  }
};

const ListPdpBar = props => (
  <div>
    <HorizontalSpacing>
      <StyledListPdpBar>
        <StyledFormControl variant="outlined">
          <StyledInputLabel htmlFor="committee-select">
            Committee
          </StyledInputLabel>
          <StyledSelect
            multiple
            onChange={e => {
              props.committeeSelected(e.target.value);
            }}
            input={
              <OutlinedInput
                labelWidth={"90"}
                name="committee"
                id="committee-select"
              />
            }
            value={props.barState.selectedCommittees}
            renderValue={() => props.barState.selectedCommittees.join(", ")}
          >
            {props.committees.map(committee => (
              <MenuItem key={committee} value={committee}>
                <Checkbox checked={getState(props, committee)} />
                <ListItemText primary={committee} />
              </MenuItem>
            ))}
          </StyledSelect>
        </StyledFormControl>
        <StyledSelect
          value={props.barState.sortOrder}
          onChange={e => {
            props.barState.changeSortOrder(e);
          }}
        />
        <DigitCheckbox onChange={e => {}} primary label="Show only sensitive" />
      </StyledListPdpBar>
    </HorizontalSpacing>
    <HorizontalLine />
  </div>
);

function getState(props, committee) {
  console.log("getstate");
  console.log(props);
  return props.barState.selectedCommittees.indexOf(committee) > -1;
}

export default ListPdpBar;
