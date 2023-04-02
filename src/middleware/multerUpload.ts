import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import multerConfig from "../config/multerConfig";

const generateStorage = (folder: string) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, folder);
    },
    filename: (req, file, cb) => {
      const ext = file.originalname.split(".").pop();
      const uniqueName = uuidv4() + "." + ext;
      cb(null, uniqueName);
    },
  });
};

//paint storage
const paintsStorage = generateStorage(multerConfig.paintsFolder);
export const uploadPaints = multer({ storage: paintsStorage });
