import { ADD_PDP, SAVE_IN_PROGRESS_PDP } from "./AddPdpElement.view.actions";

export function addPdp(pdp) {
    return {
        type: ADD_PDP,
        pdp
    };
}

export function saveInProgressPdp(pdp) {
    return {
        type: SAVE_IN_PROGRESS_PDP,
        pdp
    };
}
