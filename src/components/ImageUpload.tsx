import { ImageUploader, Button, ImageUploadItem, Toast } from "antd-mobile";
import { prepareFileList } from "../utils/files";
import React, { useEffect, useState } from "react";
import { AddCircleOutline } from "antd-mobile-icons";
import { useSpring, animated } from "react-spring";
//shakediv takes in html elements and returns a div that shakes when clicked
const ShakeDiv = ({ children, degree, stop }: any) => {
  const [props, set] = useSpring<any>(() => ({ transform: "rotate(0deg)" }));
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>();

  const interval = 200;

  useEffect(() => {
    if (stop) {
      handleStop();
    }
  }, [stop]);

  useEffect(() => {
    if (!stop) {
      const intervalId = setInterval(() => {
        set({
          transform: `rotate(${degree}deg)`,
          width: "15px",
        });
        setTimeout(() => {
          set({ transform: `rotate(-${degree}deg)`, width: "25px" });
        }, interval / 2);
      }, interval);
      setIntervalId(intervalId);
      return () => clearInterval(intervalId);
    }
  }, []);

  const handleStop = () => {
    clearInterval(intervalId);
    setTimeout(() => {
      set({ transform: `rotate(0deg)` });
    }, interval);
  };

  return (
    <animated.div style={props} onClick={handleStop}>
      {children}
    </animated.div>
  );
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
  useEffect(() => {
    if (showModelAtFirst && fileList.length >= minCount) {
      setShowModelAtFirst(false);
      setOpen(true);
    }
  }, [fileList]);
  return (
    <div style={{ width: "100%" }}>
      <p>
        Transform your pet into a work of art with 5 images and AI magic. Upload
        5 images of your pet and get the best images the next day.
      </p>
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
        <ShakeDiv stop={!showModelAtFirst} degree={5}>
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
            <ShakeDiv stop={!showModelAtFirst} degree={8}>
              <AddCircleOutline style={{ fontSize: 32 }} />
            </ShakeDiv>
          </div>
        </ShakeDiv>
      </ImageUploader>
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
