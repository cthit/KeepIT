import { connect } from "react-redux";
import App from "./App";
import { loadAllPdp } from "./App.action-creator";

const mapStateToProps = (state, ownProps) => ({
  failedLoadingPdp: state.pdp.failedLoadingPdp
});

const mapDispatchToProps = dispatch => ({
  loadAllPdp: () => dispatch(loadAllPdp())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
