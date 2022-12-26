import React, { useState } from "react";
import { AutoCenter, Grid, ImageUploadItem } from "antd-mobile";
import { Gallery } from "./components/Gallery";
import { ImageUpload, defaultImages } from "./components/ImageUpload";
import { Logo } from "./components/Logo";
import { ImageSubmitModal } from "./components/Modal";

const App = () => {
  const [open, setOpen] = useState(false);
  const [fileList, setFileList] = useState<ImageUploadItem[]>(defaultImages);

  return (
    <div style={{ padding: 0 }}>
      <AutoCenter>
        <Grid columns={1} gap={8} style={{ maxWidth: "800px" }}>
          <Grid.Item span={24}>
            <Logo />
          </Grid.Item>
          <Grid.Item span={24}>
            <ImageUpload
              open={open}
              setOpen={setOpen}
              fileList={fileList}
              setFileList={setFileList}
            />
          </Grid.Item>
          <Grid.Item span={24}>
            <Gallery />
          </Grid.Item>
        </Grid>
        <ImageSubmitModal
          open={open}
          fileList={fileList}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </AutoCenter>
    </div>
  );
};

export default App;
