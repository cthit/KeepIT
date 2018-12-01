import { connect } from "react-redux";
import ListPuhElementView from "./ListPuhElementView";
import { selectPdp } from "./ListPuhElementView.action-creator";

const mapStateToProps = (state, ownProps) => ({
  current: ownProps,
  selected: state.root.pdpListElement.selectedPdp,
  formatDate
});

const mapDispatchToProps = {
  selectPdp
};

function formatDate(date) {
  return (
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListPuhElementView);
