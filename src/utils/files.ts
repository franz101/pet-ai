export const beforeUploadValidation = (fileSize: number) => {
  const mbLimit = 25;

  return fileSize > 1024 * 1024 * mbLimit;
};

export const prepareFileList = async (file: File) => {
  const dataUrl = await getDataUrlFromFile(file);
  const buffer = await getBufferFromFile(file);

  return {
    file: file.name,
    url: dataUrl + "",
    buffer: buffer,
    size: file.size,
    name: file.name,
  };
};

export const getDataUrlFromFile = (file: any) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    // reader.readAsArrayBuffer(file);
    reader.readAsDataURL(file);
    // reader.readAsDataURL(file);
    reader.onloadend = function () {
      resolve(reader.result);
    };
  });
};

export const getBufferFromFile = (file: any) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = function () {
      resolve(reader.result);
    };
  });
};

export const getSignedUrl = async (filename: string): Promise<string> => {
  const response = await new Promise((resolve) => {
    fetch(
      "https://4mkuta5uh1.execute-api.eu-central-1.amazonaws.com/dev/upload",
      {
        method: "GET",
        headers: {
          "x-amz-meta-filekey": filename,
        },
      }
    )
      .then((response) => response.text())
      .then((data) => {
        resolve(data);
      });
  });

  return response as string;
};
