import { SAVE_IN_PROGRESS_PDP } from "./AddPdpElement.view.actions";

const initialState = {
    title: "",
    eula: "",
    start: getFormattedDate(),
    end: getFormattedDate(),
    sensitive: false,
    targetGroup: "",
    committee: "digIT",
    versionNumber: 0
};

export const addPdpElement = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_IN_PROGRESS_PDP:
            return Object.assign({}, state, (state = action.pdp));
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
