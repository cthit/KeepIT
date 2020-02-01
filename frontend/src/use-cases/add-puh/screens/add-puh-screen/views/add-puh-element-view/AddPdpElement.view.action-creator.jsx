import {
    ADD_PDP,
    SAVE_IN_PROGRESS_PDP,
    UPDATE_PDP
} from "./AddPdpElement.view.actions";

const tempPerson = {
    cid: "temp",
    nick: "Person",
    mail: "tmp@person.se"
};

export function addPdp(pdp) {
    // Here we should set the creator to the current user if it's undefined.
    pdp.creator = tempPerson;
    pdp.versionNumber = pdp.versionNumber + 1;

    if (pdp.id) {
        return {
            type: UPDATE_PDP,
            pdp: pdp
        };
    } else {
        return {
            type: ADD_PDP,
            pdp: pdp
        };
    }
}

export function saveInProgressPdp(pdp) {
    return {
        type: SAVE_IN_PROGRESS_PDP,
        pdp: pdp
    };
}
