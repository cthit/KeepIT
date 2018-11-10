import { connect } from "react-redux";
import ListPuhView from "./ListPuhView";

const mapStateToProps = (state, ownProps) => ({
  active: state.root.pdp.active
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListPuhView);
