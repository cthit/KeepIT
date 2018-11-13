import Styled from "styled-components";
import ListItem from "@material-ui/core/ListItem";
import { withStyles } from "@material-ui/core/styles";

export const ListPuhElementViewSpacing = Styled.div`
    height: 16px
`;

export const ListPuhElementViewMargin = Styled.div`
    margin: 12px;
`;

export const TextRight = Styled.div`
    text-align: right;
`;

export const Horizontal = Styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const VerticalCenter = Styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;   
`;

export const StyledListItem = withStyles({
  root: {
    marginBottom: "1px",
    backgroundColor: "white"
  }
})(ListItem);
