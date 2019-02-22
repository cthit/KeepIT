import { connect } from "react-redux";
import HeaderButtons from "./HeaderButtons.view";
import { withRouter } from "react-router-dom";

export default withRouter(
    connect(
        null,
        null
    )(HeaderButtons)
);
