import { LOAD_ALL_PDP_SUCCESSFULLY, LOAD_ALL_PDP_FAILED } from "./App.actions";
import { ADD_PDP } from "../use-cases/add-puh/screens/add-puh-screen/views/add-puh-element-view/AddPdpElement.view.actions";
import { combineReducers } from "redux";
import { pdpListElement } from "../use-cases/list-puh/screens/list-puh-screen/views/list-puh-element-view/ListPuhElementView.reducer.jsx";
import { listPdpBar } from "../use-cases/list-puh/screens/list-puh-screen/views/list-pdp-bar-view/ListPdpBar.view.reducer";
import { addPdpElement } from "../use-cases/add-puh/screens/add-puh-screen/views/add-puh-element-view/AddPdpElement.view.reducer";

export const rootReducer = combineReducers({
    pdp,
    pdpListElement,
    listPdpBar,
    addPdpElement
});

export function pdp(
    state = {
        active: [],
        committees: []
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
        case ADD_PDP:
            return Object.assign(
                {},
                state,
                (state.active = state.active.push(action.pdp))
            );
        default:
            return state;
    }
}
