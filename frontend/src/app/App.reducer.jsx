import { LOAD_ALL_PDP_SUCCESSFULLY, LOAD_ALL_PDP_FAILED } from "./App.actions";

export function pdp(state = {}, action) {
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
