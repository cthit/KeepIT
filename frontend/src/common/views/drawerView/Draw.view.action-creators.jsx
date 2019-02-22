import { ADD_PDP } from "./Draw.view.action-creators.jsx";

export function addPdp(pdpToSelect) {
  return {
    type: SELECT_PDP,
    pdpToSelect
  };
}
