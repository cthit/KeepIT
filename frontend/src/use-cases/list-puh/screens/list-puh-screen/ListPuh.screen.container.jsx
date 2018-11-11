import { connect } from "react-redux";
import { ListPuhScreen } from "./ListPuhScreen";

const mapStateToProps = state => ({
  selected: state.root.pdpListElement.selectedPdp
});

export default connect(
  mapStateToProps,
  null
)(ListPuhScreen);
