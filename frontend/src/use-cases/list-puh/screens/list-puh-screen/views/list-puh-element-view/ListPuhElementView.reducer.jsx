import { SELECT_PDP, DELETE_PDP } from "./ListPuhElementView.actions";

export const pdpListElement = (state = {}, action) => {
  switch (action.type) {
    case SELECT_PDP:
      return Object.assign({}, state, { selectedPdp: action.pdpToSelect });
    case DELETE_PDP:
      return state;
    default:
      return state;
  }
};
