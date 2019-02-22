import {
  CHANGE_SORT_ORDER,
  COMMITTEE_SELECTED,
  SHOW_ONLY_SENSITIVE
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

export function showOnlySensitive(value) {
  return {
    type: SHOW_ONLY_SENSITIVE,
    showOnlySensitive: value
  };
}
