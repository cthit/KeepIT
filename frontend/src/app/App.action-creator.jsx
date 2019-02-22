import {
  LOAD_ALL_PDP_SUCCESSFULLY,
  LOAD_ALL_PDP_FAILED
} from "./App.actions.jsx";

import axios from "axios";

export const active = [
  {
    id: "0",
    creator: {
      cid: "emiljo",
      nick: "ET",
      mail: "et@chalmers.it"
    },
    committee: "digIT",
    title: "CM - Sittning anmälan",
    start: "2018-01-01T18:25:43.511Z",
    end: "2018-04-20T12:25:43.011Z",
    eula: "SOME DATA STUFF!",
    sensitive: false,
    targetGroup: "All section members",
    lastEdit: "2017-04-23T18:25:43.511Z",
    chairman: {
      cid: "emiljo",
      nick: "ET",
      mail: "et@chalmers.it"
    },
    versionNumber: 0
  },
  {
    id: "1",
    creator: {
      cid: "mvidar",
      nick: "Vidde",
      mail: "vidde@chalmers.it"
    },
    committee: "digIT",
    title: "digIT has dat OHMSits!",
    start: "2018-11-22T12:12:12.201Z",
    end: "2018-12-15T13:34:43.511Z",
    eula: "SOME MORE DATA STUFF! :",
    sensitive: true,
    targetGroup: "Dem didIT bois",
    lastEdit: "2018-09-10",
    chairman: {
      cid: "angergard",
      nick: "Portals",
      mail: "portals@chalmers.it"
    },
    versionNumber: 0
  },
  {
    id: "2",
    creator: {
      cid: "aaaa",
      nick: "apan",
      mail: "apan@chalmers.it"
    },
    committee: "stuff",
    title: "ap-sits",
    start: "2012-02-13T12:12:12.201Z",
    end: "2018-03-24T12:12:12.201Z",
    eula: "APAS EULA 2.0!",
    sensitive: false,
    targetGroup: "Apan & co",
    lastEdit: "2013-05-05",
    chairman: {
      cid: "aaaa",
      nick: "apan",
      mail: "apan@chalmers.it"
    },
    versionNumber: 2
  }
];

export function loadAllPdp() {
  return dispatch => {
    axios
      .get("http://localhost:8081/pdp")
      .then(response => {
        console.log("HEY WE GOT SOMETHING FROM ZE SERVER! " + response);
        dispatch(loadAllPdpSuccessfully(response.data));
      })
      .catch(error => {
        //TODO'
        console.log("WHAT DA FUQ: " + error);
        dispatch(
          loadAllPdpSuccessfully({
            active: active,
            committees: getCommittees(active)
          })
        );
        dispatch(loadAllPdpFailed(error));
      });
  };
}

function getCommittees(active) {
  return [...new Set(active.map(item => item.committee))].filter(function(el) {
    return el != null;
  });
}

function loadAllPdpSuccessfully(data) {
  return {
    type: LOAD_ALL_PDP_SUCCESSFULLY,
    payload: {
      ...data
    },
    error: false
  };
}

function loadAllPdpFailed(error) {
  return {
    type: LOAD_ALL_PDP_FAILED,
    payload: {
      error: error
    },
    error: true
  };
}
