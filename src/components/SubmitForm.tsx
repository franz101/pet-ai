import { Result } from "antd-mobile";

export const completeStep = (
  <Result
    status="success"
    title="Upload successfull"
    // add email emoji at the end
    description="Wait around 24 hours for your photos to be ready. 📬"
  />
);
export const errorStep = (
  <Result
    status="error"
    title="Upload failed"
    description="Please reload the page and try again."
  />
);
