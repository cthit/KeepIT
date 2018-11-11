import { connect } from "react-redux";
import { DetailsPuhView } from "./DetailsPuhView";

const mapStateToProps = (state, ownProps) => ({
  selected: state.root.pdpListElement.selectedPdp
});

export default connect(
  mapStateToProps,
  null
)(DetailsPuhView);
