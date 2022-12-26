import React, { useState } from "react";

import { Modal, Form, Toast } from "antd-mobile";
import { UserDetailsStep } from "./UserDetailsStep";
import { completeStep, errorStep } from "./SubmitForm";
import { UploadStep } from "./UploadStep";

export const ImageSubmitModal = ({ open, onCancel, fileList }: any) => {
  const [values, setValues] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const validate = () => {
    form
      .validateFields()
      .then((values: any) => {
        form.resetFields();
        setValues(values);

        setCurrentStep(1);
      })
      .catch((info: any) => {
        console.log(info);
        Toast.show({
          maskStyle: { minWidth: "600px" },
          icon: "fail",
          content: (
            <>
              Please fill out all
              <br />
              required fields.
            </>
          ),
        });
      });
  };
  const actions = [
    [
      {
        key: "action",
        text: "Submit",
        danger: true,
      },
    ],
    [],
    [],
    [],
  ];
  return (
    <Modal
      visible={open}
      title={["Submit your photos", "Progress", "", ""][currentStep]}
      onClose={onCancel}
      actions={actions[currentStep]}
      showCloseButton={currentStep !== 1}
      onAction={(action) => {
        if (action.key === "cancel") {
          setCurrentStep(0);
        } else if (action.key === "action") {
          validate();
        }
      }}
      content={
        [
          <UserDetailsStep form={form} validate={validate} />,
          <UploadStep
            fileList={fileList}
            values={values}
            onComplete={() => setCurrentStep(2)}
            onError={() => setCurrentStep(3)}
          />,
          completeStep,
          errorStep,
        ][currentStep]
      }
    />
  );
};
