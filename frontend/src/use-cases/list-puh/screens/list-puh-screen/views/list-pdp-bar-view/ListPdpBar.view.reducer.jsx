import {
  CHANGE_SORT_ORDER,
  COMMITTEE_SELECTED,
  SHOW_ONLY_SENSITIVE
} from "./ListPdpBar.view.actions";

const initialState = {
  sortOrders: ["A-Z", "Z-A", "Newest-Oldest", "Oldest-Newest"],
  sortOrder: "",
  selectedCommittees: [],
  showOnlySensitive: false
};

export const listPdpBar = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SORT_ORDER:
      return Object.assign({}, state, (state.sortOrder = action.newSortOrder));
    case COMMITTEE_SELECTED:
      return Object.assign(
        {},
        state,
        (state.selectedCommittees = action.committee)
      );
    case SHOW_ONLY_SENSITIVE:
      return Object.assign(
        {},
        state,
        (state.showOnlySensitive = action.showOnlySensitive)
      );
    default:
      return state;
  }
};
