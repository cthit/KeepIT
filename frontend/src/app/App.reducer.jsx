import { LOAD_ALL_PDP_SUCCESSFULLY, LOAD_ALL_PDP_FAILED } from "./App.actions";
import {
    ADD_PDP,
    UPDATE_PDP
} from "../use-cases/add-puh/screens/add-puh-screen/views/add-puh-element-view/AddPdpElement.view.actions";
import { combineReducers } from "redux";
import { pdpListElement } from "../use-cases/list-puh/screens/list-puh-screen/views/list-puh-element-view/ListPuhElementView.reducer.jsx";
import { listPdpBar } from "../use-cases/list-puh/screens/list-puh-screen/views/list-pdp-bar-view/ListPdpBar.view.reducer";
import { addPdpElement } from "../use-cases/add-puh/screens/add-puh-screen/views/add-puh-element-view/AddPdpElement.view.reducer";

const tempPerson = {
    cid: "pothol",
    nick: "Potholes",
    mail: "derp@derp.se"
};

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
            console.log("ADD PDP:::::::::::");
            console.log(action.pdp);
            // This should later be replaced with a post request to the server.
            var pdp = action.pdp;
            var newArr = state.active;

            pdp.active = newArr;
            pdp.id = (123123 + newArr.length).toString();
            pdp.lastEdit = "2013-05-23T18:25:43.511Z";
            pdp.invalidated = false;
            pdp.creator = tempPerson;
            pdp.chairman = tempPerson;
            newArr.push(action.pdp);
            return Object.assign({}, state, (state.active = newArr));
        case UPDATE_PDP:
            var toBeUpdated;
            for (var i = 0; i < state.active.length; i++) {
                if (state.active[i].id == action.pdp.id) {
                    toBeUpdated = state.active[i];
                }
                if (toBeUpdated) {
                    // Do a post request here!
                    action.type = ADD_PDP;
                    pdp(state, action);
                } else {
                    console.log(
                        "ERROR: No pdp with id: " + action.pdp.id + " was found"
                    );
                }
            }
        default:
            return state;
    }
}
