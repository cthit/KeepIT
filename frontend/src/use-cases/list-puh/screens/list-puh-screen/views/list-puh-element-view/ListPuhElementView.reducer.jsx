import { SELECT_PDP, DELETE_PDP } from "./ListPuhElementView.actions";

const initialState = {
  selectedPdp: {
    exists: false,
    creator: {
      cid: "Please select Pdp!",
      nick: "Please select Pdp!",
      mail: "Please select Pdp!"
    },
    sensitive: false,
    chairman: {
      cid: "Please select Pdp!",
      nick: "Please select Pdp!",
      mail: "Please select Pdp!"
    }
  }
};

export const pdpListElement = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_PDP:
      return Object.assign({}, state, {
        selectedPdp: Object.assign({}, action.pdpToSelect, { exists: true })
      });
    case DELETE_PDP:
      return state;
    default:
      return state;
  }
};
