import styled from "styled-components";
import { Select, FormControl, InputLabel } from "@material-ui/core";

export const SortFilterContainer = styled.div``;

export const StyledListPdpBar = styled.div`
  width: 100%;
  min-height: 50px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const HorizontalLine = styled.div`
  background-color: #c0c0c0;
  height: 1px;
`;

export const StyledSelect = styled(Select)`
  flex-grow: 1;
  margin-right: 10px;
  margin-left: 10px;
`;

export const StyledFormControl = styled(FormControl)`
  flex-grow: 1;
  margin-right: 10px;
  margin-left: 10px;
  minwidth: 120;
`;

export const StyledInputLabel = styled(InputLabel)`
  margin-left: 10px;
`;
