import { connect } from "react-redux";
import ListPuhView from "./ListPuh.view";

const mapStateToProps = state => ({
  active: getActiveWithFilter(state)
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListPuhView);

function getActiveWithFilter(state) {
  var selected = state.root.listPdpBar.selectedCommittees;
  var showOnlySensitives = state.root.listPdpBar.showOnlySensitive;
  var sortValues = state.root.listPdpbar;
  var active = state.root.pdp.active;

  if (selected.length > 0) {
    active = active.filter(function(el) {
      return selected.includes(el.committee);
    });
  }

  if (showOnlySensitives) {
    active = active.filter(function(el) {
      return el.sensitive;
    });
  }

  return active;
}
