import {
  ImageUploader,
  Button,
  ImageUploadItem,
  Toast,
  ConfigProvider,
} from "antd-mobile";
import { prepareFileList } from "../utils/files";
import React, { useEffect, useRef, useState } from "react";
import { AddCircleOutline } from "antd-mobile-icons";
import { useSpring, animated } from "react-spring";
import { enUS } from "../localisation/en_Us";

const useShake = (degree: number) => {
  const [props, set] = useSpring<any>(() => ({ transform: "rotate(0deg)" }));
  const intervalId = useRef<NodeJS.Timer>();

  const interval = 200;

  useEffect(() => {
    const id = setInterval(() => {
      set({
        transform: `rotate(${degree}deg)`,
        width: "15px",
      });
      setTimeout(() => {
        set({ transform: `rotate(-${degree}deg)`, width: "25px" });
      }, interval / 2);
    }, interval);
    intervalId.current = id;
    return () => clearInterval(id);
  }, []);

  const stopAnimation = () => {
    // clearInterval(intervalId.current);
    // setTimeout(() => {
    //   set({ transform: `rotate(0deg)` });
    // }, interval);
  };

  return [props, stopAnimation] as any;
};

export const defaultImages: Array<ImageUploadItem & { uid: string }> = [
  {
    uid: "-1",
    url: "./img/dog_upload.jpg",
  },
];

export const ImageUpload = ({
  open,
  setOpen,
  fileList,
  setFileList,
}: {
  open: boolean;
  setOpen: (arg: boolean) => void;
  fileList: ImageUploadItem[];
  setFileList: (arg: ImageUploadItem[]) => void;
}) => {
  const maxCount = 10;
  const minCount = 3;
  // showModelAtFirst
  const [showModelAtFirst, setShowModelAtFirst] = useState(true);
  const [fileListLength, setFileListLength] = useState(fileList.length);
  useEffect(() => {
    if (showModelAtFirst && fileList.length >= minCount) {
      setShowModelAtFirst(false);
      setOpen(true);
    }
  }, [fileList]);

  const [animation, stopAnimation] = useShake(9);

  useEffect(() => {
    if (!showModelAtFirst && fileList.length >= minCount) {
      stopAnimation();
    }
  }, [showModelAtFirst, stopAnimation]);
  return (
    <div style={{ width: "100%" }}>
      <p>
        Transform your pet into a work of art with 5 images and AI magic. Upload
        5 images of your pet and get the best images the next day.
      </p>
      <ConfigProvider locale={enUS}>
        <ImageUploader
          // beforeUpload={(file, files) => {
          //   // const validFile = beforeUploadValidation(file.size);
          //   if (file) {
          //     return file;
          //   } else {
          //     Toast.show("File size must be less than 25MB");
          //     return null;
          //   }
          // }}
          value={fileList}
          style={{ "--cell-size": "150px" }}
          onChange={(items: ImageUploadItem[]) => {
            setFileList(items.filter((item) => (item as any)?.uid !== "-1"));
          }}
          upload={prepareFileList}
          multiple
          maxCount={maxCount}
          showUpload={fileList.length < maxCount}
          onCountExceed={(exceed) => {
            Toast.show(
              `Photo count must be between ${minCount} and ${maxCount}. ${exceed}`
            );
          }}
        >
          {showModelAtFirst && fileList.length === fileListLength ? (
            <animated.div key={"1212"} style={animation}>
              <div
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: 40,
                  backgroundColor: "#f5f5f5",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#999999",
                }}
              >
                <AddCircleOutline style={{ fontSize: 32 }} />
              </div>
            </animated.div>
          ) : (
            <div
              style={{
                width: "150px",
                height: "150px",
                borderRadius: 40,
                backgroundColor: "#f5f5f5",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#999999",
              }}
            >
              <AddCircleOutline style={{ fontSize: 32 }} />
            </div>
          )}
        </ImageUploader>
      </ConfigProvider>
      <br />
      {fileList.length > 2 && (
        <Button
          block
          onClick={() => setOpen(true)}
          color="primary"
          size="large"
          shape="rounded"
        >
          Upload
        </Button>
      )}
    </div>
  );
};
