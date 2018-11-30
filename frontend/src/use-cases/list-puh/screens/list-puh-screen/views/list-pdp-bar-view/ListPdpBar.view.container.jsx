import { connect } from "react-redux";
import ListPdpBar from "./ListPdpBar.view";
import {
  changeSortOrder,
  showOnlySensitive,
  committeeSelected
} from "./ListPdpBar.view.action-creator";

const mapStateToProps = state => ({
  barState: state.root.listPdpBar,
  committees: state.root.pdp.committees
});

const mapDispatchToProps = {
  changeSortOrder,
  committeeSelected,
  showOnlySensitive
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListPdpBar);
