import { LOAD_ALL_PDP_SUCCESSFULLY, LOAD_ALL_PDP_FAILED } from "./App.actions";
import { combineReducers } from "redux";
import { pdpListElement } from "../use-cases/list-puh/screens/list-puh-screen/views/list-puh-element-view/ListPuhElementView.reducer.jsx";

export const rootReducer = combineReducers({
  pdp,
  pdpListElement
});

export function pdp(
  state = {
    active: []
  },
  action
) {
  switch (action.type) {
    case LOAD_ALL_PDP_SUCCESSFULLY:
      return {
        ...state,
        ...action.payload,
        failedLoadingPdp: false
      };
    case LOAD_ALL_PDP_FAILED:
      return {
        ...state,
        failedLoadingPdp: true
      };
    default:
      return state;
  }
}
