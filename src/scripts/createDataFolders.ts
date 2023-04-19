import fs from "fs";
import path from "path";
const createDataFoldersScript = {
  listFolders: (): string[] => {
    return [path.join(__dirname, "./../../data"), path.join(__dirname, "./../../data/online_paints")];
  },
  makeFolder: (path: string) => {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
  },
  init: () => {
    const listFolders = createDataFoldersScript.listFolders();
    listFolders.map((path) => {
      createDataFoldersScript.makeFolder(path);
    });
  },
};

export default createDataFoldersScript;
