import {
  CHANGE_SORT_ORDER,
  COMMITTEE_SELECTED
} from "./ListPdpBar.view.actions";

const initialState = {
  sortOrder: "",
  selectedCommittees: []
};

export const listPdpBar = (state = initialState, action) => {
  console.log("Heres da action: ");
  console.log(action);
  switch (action.type) {
    case CHANGE_SORT_ORDER:
      return Object.assign({}, state, (state.sortOrder = action.value));
    case COMMITTEE_SELECTED:
      return Object.assign(
        {},
        state,
        (state.selectedCommittees = action.committee)
      );
    default:
      return state;
  }
};
