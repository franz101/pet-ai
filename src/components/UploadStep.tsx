import { ProgressBar } from "antd-mobile";
import { useState, useEffect } from "react";
import { getSignedUrl } from "../utils/files";

export const UploadStep = ({
  fileList,
  onComplete,
  onError,
  values,
}: {
  fileList: any[];
  onComplete: () => void;
  onError: () => void;
  values: any;
}) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const upload = async () => {
      try {
        let uploaded = 0;
        const totalFileSize = fileList.reduce(
          (acc, file) => acc + file.size,
          0
        );
        setPercent(0);
        const uuid = Date.now() + Math.random().toString().slice(2, 6);
        const signedUrl = await getSignedUrl(`${uuid}/meta.json`);
        fetch(signedUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            values,
          }),
        });
        let counter = 0;
        for await (const file of fileList) {
          const [type, base64] = file.url.split(";");
          const ext = type.split("/")[1];
          const signedUrl = await getSignedUrl(`${uuid}/${counter}.${ext}`);
          counter++;
          const response = await new Promise((resolve, reject) =>
            fetch(signedUrl, {
              method: "PUT",
              headers: {
                "Content-Type": type,
              },
              body: file.buffer,
            })
              .then((response) => resolve(response))
              .catch((error) => {
                console.log(error);
                reject(error);
              })
          );

          uploaded += file.size;
          setPercent((uploaded / totalFileSize) * 100);
        }
        onComplete();
      } catch (error) {
        onError();
      }
    };
    upload();
  }, [fileList]);
  return <ProgressBar percent={percent} rounded={false} />;
};
