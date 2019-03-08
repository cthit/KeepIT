import { SAVE_IN_PROGRESS_PDP } from "./AddPdpElement.view.actions";
import { EDIT_PDP } from "../../../../../list-puh/screens/list-puh-screen/views/details-puh-view/DetailsPdp.view.actions";

const initialState = {
    creator: {
        cid: ""
    },
    title: "",
    eula: "",
    start: getFormattedDate(),
    end: getFormattedDate(),
    sensitive: false,
    targetGroup: "",
    committee: "",
    versionNumber: -1,
    chairman: {
        cid: "",
        nick: "",
        mail: ""
    }
};

export const addPdpElement = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_IN_PROGRESS_PDP:
            return Object.assign({}, state, (state = action.pdp));
        case EDIT_PDP:
            console.log("Should have default data:");
            console.log(action.pdp);
            return action.pdp;
        default:
            return state;
    }
};

function getFormattedDate() {
    var date = new Date();
    var day = date.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    var month = date.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    var year = date.getFullYear();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var seconds = date.getSeconds();

    return (
        year +
        "-" +
        month +
        "-" +
        day +
        "T" +
        hour +
        ":" +
        minute +
        ":" +
        seconds
    );
    //    return date.getFullYear() + "-" +
    //    2012-04-23T18:25:43.511Z
}
