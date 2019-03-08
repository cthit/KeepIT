import { connect } from "react-redux";
import { DetailsPuhView } from "./DetailsPuhView";
import { EditPdp } from "./DetailsPdp.view.action-creator";

const mapStateToProps = (state, ownProps) => ({
    selected: state.root.pdpListElement.selectedPdp
});

const mapDispatchToProps = { EditPdp };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailsPuhView);
