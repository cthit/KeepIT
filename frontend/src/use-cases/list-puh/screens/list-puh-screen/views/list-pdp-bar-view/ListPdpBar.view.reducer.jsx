import { CHANGE_SORT_ORDER } from "./ListPdpBar.view.actions";

const initialState = {
    listPdpBar: {
        sortOrder: ""
    }
};

export const changeSortOrder = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SORT_ORDER:
        return Object.assign({}, state, state.listPdpBar = {
            sortOrder: action
        });
    default:
      return state;
  }
};
