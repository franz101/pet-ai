import { ImageUploader, Button, ImageUploadItem, Toast } from "antd-mobile";
import { beforeUploadValidation } from "../utils/files";

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

  function prepareFileList(file: File): Promise<ImageUploadItem> {
    throw new Error("Function not implemented.");
  }

  return (
    <div style={{ width: "100%" }}>
      <p>
        Transform your pet into a work of art with 5 images and AI magic. Upload
        5 images of your pet and get the best images the next day.
      </p>
      <ImageUploader
        beforeUpload={(file, files) => {
          const validFile = beforeUploadValidation(file.size);
          if (validFile) {
            return file;
          } else {
            Toast.show("File size must be less than 25MB");
            return null;
          }
        }}
        value={fileList}
        style={{ "--cell-size": "150px" }}
        onUploadQueueChange={console.log}
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
      />
      <br />
      {fileList.length > 2 && (
        <Button block onClick={() => setOpen(true)}>
          Upload
        </Button>
      )}
    </div>
  );
};
