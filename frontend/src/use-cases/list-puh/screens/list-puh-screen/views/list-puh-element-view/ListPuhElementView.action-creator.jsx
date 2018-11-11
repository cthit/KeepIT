import { DELETE_PDP, SELECT_PDP } from "./ListPuhElementView.actions.jsx";

export function selectPdp(pdpToSelect) {
  return {
    type: SELECT_PDP,
    pdpToSelect
  };
}

export function deletePDP(pdpToDelete) {
  return {
    type: DELETE_PDP,
    pdpToDelete
  };
}
