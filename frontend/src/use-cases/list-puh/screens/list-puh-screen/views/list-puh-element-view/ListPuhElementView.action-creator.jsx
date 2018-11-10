import { DELETE_PDP, SELECT_PDP } from "./ListPuhElementsView.actions.jsx";

export function changeSelectedPDP(pdpToDelete) {
  return {
    type: SELECT_PDP,
    pdpToDelete
  };
}

export function deletePDP(pdpToDelete) {
  return {
    type: DELETE_PDP,
    pdpToDelete
  };
}
