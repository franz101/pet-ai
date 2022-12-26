import React, { Fragment, useEffect, useState } from "react";

import {
  Modal,
  Input,
  Checkbox,
  Form,
  TextArea,
  Toast,
  ErrorBlock,
  ResultPage,
  ProgressBar,
  ImageUploadItem,
  Result,
} from "antd-mobile";
import { UserDetailsStep } from "./UserDetailsStep";
import { completeStep, errorStep } from "./SubmitForm";
import { UploadStep } from "./UploadStep";

export const ImageSubmitModal = ({
  open,
  onCreate,
  onCancel,
  setFileList,
  fileList,
}: any) => {
  const [values, setValues] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const validate = () => {
    form
      .validateFields()
      .then((values: any) => {
        form.resetFields();
        onCreate(values);
        console.log(values);
        setValues(values.email);

        setCurrentStep(1);
      })
      .catch((info: any) => {
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
    [
      {
        key: "action",
        text: "Next",
        danger: true,
      },
    ],
  ];
  return (
    <Modal
      visible={open}
      title={currentStep === 0 ? "Submit your photos" : ""}
      onClose={onCancel}
      actions={actions[currentStep]}
      onAction={() => {
        validate();
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
