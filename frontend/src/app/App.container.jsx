import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import App from "./App";
import { loadAllPdp } from "./App.action-creator";

const mapStateToProps = state => ({
    failedLoadingPdp: state.failedLoadingPdp
});

const mapDispatchToProps = dispatch => ({
    loadAllPdp: () => dispatch(loadAllPdp())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(App));
