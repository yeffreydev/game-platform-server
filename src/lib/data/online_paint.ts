import path from "path";
import { readFile, verifyFileExists, writeFile } from ".";

const paintConfig = {
  folder: path.join(__dirname, "./../../../data/online_paints/"),
};
export const readOnlinePaints = async (paintId: string) => {
  const file = paintId + ".json";
  const stringData = await readFile(paintConfig.folder, file);
  if (!stringData.length) return [];
  const parsedData: string[] = JSON.parse(stringData);
  return parsedData;
};

export const addNewPaintSocket = async (paintId: string, socketId: string) => {
  try {
    //verify if online paint existes, if exists, readFile and add.
    const file = paintId + ".json";
    const filePath = paintConfig.folder + file;
    const isFileExists = verifyFileExists(filePath);
    if (!isFileExists) {
      return writeFile(paintConfig.folder, file, JSON.stringify([socketId]));
    }
    const paintSockets = await readOnlinePaints(paintId);
    if (paintSockets.find((item) => item === socketId)) throw new Error("Socket id already exits");
    paintSockets.push(socketId);
    //save newData
    const stringData = JSON.stringify(paintSockets);
    writeFile(paintConfig.folder, file, stringData);
  } catch (e) {
    console.log(e);
  }
};

export const removePaintSocket = async (paintId: string, socketId: string) => {
  try {
    const file = paintId + ".json";
    const filePath = paintConfig.folder + file;
    const isFileExists = verifyFileExists(filePath);
    if (!isFileExists) {
      return writeFile(paintConfig.folder, file, JSON.stringify([socketId]));
    }
    const paintSockets = await readOnlinePaints(paintId);
    if (!paintSockets.find((item) => item === socketId)) throw new Error("Socket id not found");
    const newPaintsSockets = paintSockets.filter((item) => item != socketId);
    //save newData
    const stringData = JSON.stringify(newPaintsSockets);
    writeFile(paintConfig.folder, file, stringData);
  } catch (e) {
    console.log(e);
  }
};
