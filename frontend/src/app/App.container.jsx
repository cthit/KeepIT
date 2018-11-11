import { connect } from "react-redux";
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
)(App);