import { connect } from "react-redux";
import ListPdpBar from "./ListPdpBar.view";
import { changeSortOrder } from "./ListPdpBar.view.action-creator";

const mapStateToProps = (state) => ({
    barState: state.root.listPdpBar
});

const mapDispatchToProps = {
  changeSortOrder
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListPdpBar);
