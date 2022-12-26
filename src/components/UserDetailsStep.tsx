import { Form, Input, TextArea, Toast } from "antd-mobile";

export const UserDetailsStep = ({
  form,
  validate,
}: {
  form: any;
  validate: any;
}) => {
  return (
    <Form
      form={form}
      layout="vertical"
      name="form_in_modal"
      initialValues={{
        modifier: "public",
      }}
    >
      <Form.Item
        name="email"
        label="E-Mail"
        rules={[
          {
            required: true,
            type: "email",
            message: "Please enter a correct E-Mail address.",
          },
        ]}
      >
        <Input autoFocus onEnterPress={validate} />
      </Form.Item>
      <Form.Item name="wishes" label="Wishes (optional)">
        <TextArea
          rows={4}
          placeholder="Portraits in the style of:&#10;Harry Potter, Star Wars, Van Gogh"
          maxLength={6}
        />
      </Form.Item>
      {/* <Form.Item
        required
        name="terms"
        
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error("Should accept agreement")),
          },
        ]}
      >
        <Checkbox >Agree terms of service</Checkbox>
      </Form.Item> */}
    </Form>
  );
};
