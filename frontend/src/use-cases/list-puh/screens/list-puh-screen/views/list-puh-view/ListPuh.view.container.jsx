import { connect } from "react-redux";
import ListPuhView from "./ListPuh.view";

const mapStateToProps = state => ({
    active: getActiveWithFilter(state)
});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListPuhView);

function getActiveWithFilter(state) {
    var selected = state.root.listPdpBar.selectedCommittees;
    var showOnlySensitives = state.root.listPdpBar.showOnlySensitive;
    var sortValues = state.root.listPdpBar.sortOrder;
    var active = state.root.pdp.active;

    if (selected.length > 0) {
        active = active.filter(function(el) {
            return selected.includes(el.committee);
        });
    }

    if (showOnlySensitives) {
        active = active.filter(function(el) {
            return el.sensitive;
        });
    }

    var compareMethod;

    switch (sortValues) {
        case "A-Z":
            compareMethod = sortAlphabetically;
            break;
        case "Z-A":
            compareMethod = sortAntiAlphabetically;
            break;
        case "Newest-Oldest":
            compareMethod = sortByDate;
            break;
        case "Oldest-Newest":
            compareMethod = sortByAntiDate;
            break;
        default:
            compareMethod = sortByDate;
            break;
    }

    active = convertToDates(active);

    return active.slice(0).sort(compareMethod);
}

function sortAlphabetically(a, b) {
    var compA = a.title.toLowerCase();
    var compB = b.title.toLowerCase();
    if (compA === compB) {
        return 0;
    } else if (compA > compB) {
        return 1;
    } else {
        return -1;
    }
}

function sortAntiAlphabetically(a, b) {
    var compA = a.title.toLowerCase();
    var compB = b.title.toLowerCase();
    if (compA === compB) {
        return 0;
    } else if (compA > compB) {
        return -1;
    } else {
        return 1;
    }
}

function sortByDate(a, b) {
    if (a.start == b.start) {
        return 0;
    } else if (a.start > b.start) {
        return -1;
    } else {
        return 1;
    }
}

function sortByAntiDate(a, b) {
    if (a.start == b.start) {
        return 0;
    } else if (a.start > b.start) {
        return 1;
    } else {
        return -1;
    }
}

function convertToDates(active) {
    var element;
    for (var i = 0; i < active.length; i++) {
        element = active[i];
        element.start = new Date(element.start);
        element.end = new Date(element.end);
        element.lastEdit = new Date(element.lastEdit);
    }
    return active;
}
