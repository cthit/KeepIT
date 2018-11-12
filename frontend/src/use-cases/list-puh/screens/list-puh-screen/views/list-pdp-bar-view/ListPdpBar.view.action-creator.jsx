import { CHANGE_SORT_ORDER } from "./ListPdpBar.view.actions";

export function changeSortOrder(newSortOrder) {
  return {
    type: CHANGE_SORT_ORDER,
    newSortOrder
  };
}