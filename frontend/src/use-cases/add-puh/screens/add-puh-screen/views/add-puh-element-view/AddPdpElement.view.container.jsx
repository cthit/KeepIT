import { connect } from "react-redux";
import AddPuhElementView from "./AddPuhElementView";
import { addPdp, saveInProgressPdp } from "./AddPdpElement.view.action-creator";

const mapStateToProps = state => ({
    pdp: state.root.addPdpElement,
    committees: state.root.pdp.committees
});

const mapDispatchToProps = { addPdp, saveInProgressPdp };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPuhElementView);
