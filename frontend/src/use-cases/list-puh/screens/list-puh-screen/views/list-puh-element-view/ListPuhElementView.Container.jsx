import { connect } from "react-redux";
import ListPuhElementView from "./ListPuhElementView";
import { selectPdp } from "./ListPuhElementView.action-creator";

const mapStateToProps = (state, ownProps) => ({
  current: ownProps,
  selected: state.root.pdpListElement.selectedPdp
});

const mapDispatchToProps = {
  selectPdp
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListPuhElementView);
