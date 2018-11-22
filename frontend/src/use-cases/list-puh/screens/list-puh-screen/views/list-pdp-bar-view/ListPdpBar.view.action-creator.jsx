import {
  CHANGE_SORT_ORDER,
  COMMITTEE_SELECTED
} from "./ListPdpBar.view.actions";

export function changeSortOrder(newSortOrder) {
  return {
    type: CHANGE_SORT_ORDER,
    newSortOrder
  };
}

export function committeeSelected(committee) {
  return {
    type: COMMITTEE_SELECTED,
    committee
  };
}
