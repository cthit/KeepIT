import { SELECT_PDP, DELETE_PDP } from "./ListPuhElementView.actions";

const initialState = {
  selectedPdp: {
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
      return Object.assign({}, state, { selectedPdp: action.pdpToSelect });
    case DELETE_PDP:
      return state;
    default:
      return state;
  }
};
