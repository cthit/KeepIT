import React from "react";
import * as yup from "yup";
import {
  DigitEditData,
  DigitLayout,
  DigitDesign,
  DigitTextArea,
  DigitTextField,
  DigitSelect,
  DigitCheckbox
} from "@cthit/react-digit-components";
import { AddPuhElementViewSpacing } from "./AddPuhElementView.styles";

const AddPuhElementView = () => (
  <div>
    <DigitLayout.Center>
      <DigitEditData
        initialValues={{
          eula:
            "The data collected will be used to determine the space and inventory needed for the event. It will also be used to contact you in case of changes. The infomration will be shared with all members of <insert committee> and the sections DPO's in purpose of controlling complience.",
          startDate: "2012-04-23T18:25:43.511Z",
          endDate: "2012-04-23T18:25:43.511Z",
          sensitivePDP: false,
          targetGroup: "Hela IT-sektionen"
        }}
        onSubmit={values => {
          console.log(values);
        }}
        validationSchema={yup.object().shape({
          title: yup.string().required(),
          eula: yup.string().required(),
          startDate: yup.string().required(),
          endDate: yup.string().required(),
          sensitivePDP: yup.boolean().required(),
          targetGroup: yup.string().required(),
          committee: yup.string().required()
        })}
        titleText={"title text"}
        submitText={"Submit"}
        keysOrder={[
          "title",
          "eula",
          "startDate",
          "endDate",
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
          startDate: {
            component: DigitTextField,
            componentProps: {
              upperLabel: "Start Date"
            }
          },
          endDate: {
            component: DigitTextField,
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
              valueToTextMap: {
                digit: "digIT",
                prit: "P.R.I.T.",
                styrit: "StyrIT",
                drawit: "DrawIT"
              }
            }
          }
        }}
      />
    </DigitLayout.Center>
    <AddPuhElementViewSpacing />
  </div>
);

export default AddPuhElementView;
