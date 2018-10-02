import {
  LOAD_ALL_PDP_SUCCESSFULLY,
  LOAD_ALL_PDP_FAILED
} from "./App.actions.jsx";

import axios from "axios";

export function loadAllPdp() {
  return dispatch => {
    axios
      .get("http://localhost:3005/pdp")
      .then(response => {
        console.log(response);
        dispatch(loadAllPdpSuccessfully(response.data));
      })
      .catch(error => {
        //TODO'
        console.log(error);
        dispatch(
          loadAllPdpSuccessfully({
            active: [
              {
                id: "123",
                title: "CMd - Sittning anmälan",
                start: "2018-01-01"
              },
              {
                id: "1337",
                title: "Lol digIT har sittning",
                start: "2018-05-02"
              },
              {
                id: "1233321",
                title: "P.R.I.T. pubrunda data",
                start: "2018-43-234"
              }
            ]
          })
        );
        // dispatch(loadAllPdpFailed(error));
      });
  };
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
