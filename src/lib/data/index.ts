import fs from "fs";
export const readFile = (path: string, file: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const filePath = `${path}${file}`;
    fs.promises
      .readFile(filePath, "utf8")
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

export const writeFile = async (path: string, file: string, data: string) => {
  try {
    const filePath = path + file;
    if (!fs.existsSync(filePath)) {
      await fs.promises.writeFile(filePath, "");
    }
    await fs.promises.writeFile(`${filePath}`, data, "utf8");
    console.log(`Data saved successfully to ${filePath}`);
  } catch (error) {
    console.error(error);
  }
};

export const verifyFileExists = (filePath: string): boolean => {
  return fs.existsSync(filePath);
};

export const deleteFile = () => {};
