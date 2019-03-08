import { EDIT_PDP } from "./DetailsPdp.view.actions";

export function EditPdp(pdp) {
    console.log("ASDASDASDASDASDASDASDASDASDASDASD::::");
    console.log(pdp);
    return {
        type: EDIT_PDP,
        pdp: pdp
    };
}
