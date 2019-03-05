import React from "react";
import HorizontalSpacing from "../../../../../../common-ui/views/horizontal-spacing";
import {
    StyledListPdpBar,
    HorizontalLine,
    StyledSelect,
    StyledFormControl,
    StyledInputLabel
} from "./ListPdpBar.view.styles";
import { DigitSwitch } from "@cthit/react-digit-components";
import {
    OutlinedInput,
    MenuItem,
    Checkbox,
    ListItemText
} from "@material-ui/core";

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
                                labelWidth={90}
                                name="committee"
                                id="committee-select"
                            />
                        }
                        value={props.barState.selectedCommittees}
                        renderValue={() =>
                            props.barState.selectedCommittees.join(", ")
                        }
                    >
                        {props.committees.map(committee => (
                            <MenuItem key={committee} value={committee}>
                                <Checkbox
                                    checked={
                                        props.barState.selectedCommittees.indexOf(
                                            committee
                                        ) > -1
                                    }
                                />
                                <ListItemText primary={committee} />
                            </MenuItem>
                        ))}
                    </StyledSelect>
                </StyledFormControl>
                <StyledFormControl variant="outlined">
                    <StyledInputLabel htmlFor="committee-select">
                        Sort order
                    </StyledInputLabel>
                    <StyledSelect
                        onChange={e => {
                            props.changeSortOrder(e.target.value);
                        }}
                        input={
                            <OutlinedInput
                                labelWidth={80}
                                name="committee"
                                id="committee-select"
                            />
                        }
                        value={props.barState.sortOrder}
                        renderValue={() => props.barState.sortOrder}
                    >
                        {props.barState.sortOrders.map(sortOrder => (
                            <MenuItem key={sortOrder} value={sortOrder}>
                                <ListItemText primary={sortOrder} />
                            </MenuItem>
                        ))}
                    </StyledSelect>
                </StyledFormControl>
                <DigitSwitch
                    onChange={e => {
                        props.showOnlySensitive(e.target.checked);
                    }}
                    value={props.barState.showOnlySensitive}
                    primary
                    label="Show only sensitive"
                />
            </StyledListPdpBar>
        </HorizontalSpacing>
        <HorizontalLine />
    </div>
);

export default ListPdpBar;
