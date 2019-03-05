import React from "react";
import * as yup from "yup";
import {
    DigitEditData,
    DigitLayout,
    DigitTextArea,
    DigitTextField,
    DigitSelect,
    DigitCheckbox,
    DigitDateAndTimePicker
} from "@cthit/react-digit-components";
import { AddPuhElementViewSpacing } from "./AddPuhElementView.styles";

const AddPuhElementView = props => (
    <div>
        <DigitLayout.Center>
            {console.log(props.pdp.start)}
            <DigitEditData
                initialValues={{
                    title: props.pdp.title,
                    eula: props.pdp.eula,
                    start: props.pdp.start,
                    end: props.pdp.end,
                    sensitivePDP: props.pdp.sensitivePDP,
                    targetGroup: props.pdp.targetGroup,
                    committee: props.pdp.committee
                }}
                onSubmit={(values, actions) => {
                    values.committee = props.committees[values.committee];
                    values.versionNumber = props.pdp.versionNumber;
                    console.log("Submitting values :::::::");
                    console.log(values);
                    props.addPdp(values);
                    actions.resetForm();
                }}
                validationSchema={yup.object().shape({
                    title: yup.string().required(),
                    eula: yup.string().required(),
                    start: yup.string().required(),
                    end: yup.string().required(),
                    sensitivePDP: yup.boolean().required(),
                    targetGroup: yup.string().required(),
                    committee: yup
                        .string()
                        .min(1)
                        .required()
                })}
                submitText={"Submit"}
                keysOrder={[
                    "title",
                    "eula",
                    "start",
                    "end",
                    "sensitivePDP",
                    "targetGroup",
                    "committee"
                ]}
                keysComponentData={{
                    title: {
                        component: DigitTextField,
                        componentProps: {
                            upperLabel: "Title"
                        }
                    },
                    eula: {
                        component: DigitTextArea,
                        componentProps: {
                            upperLabel: "EULA"
                        }
                    },
                    start: {
                        component: DigitDateAndTimePicker,
                        componentProps: {
                            upperLabel: "Start Date"
                        }
                    },
                    end: {
                        component: DigitDateAndTimePicker,
                        componentProps: {
                            upperLabel: "End Date"
                        }
                    },
                    sensitivePDP: {
                        component: DigitCheckbox,
                        componentProps: {
                            primary: true,
                            label: "Sensitive PDP"
                        }
                    },
                    targetGroup: {
                        component: DigitTextField,
                        componentProps: {
                            upperLabel: "Target Group"
                        }
                    },
                    committee: {
                        component: DigitSelect,
                        componentProps: {
                            upperLabel: "Committee",
                            valueToTextMap: props.committees
                        }
                    }
                }}
            />
        </DigitLayout.Center>
        <AddPuhElementViewSpacing />
    </div>
);

export default AddPuhElementView;
