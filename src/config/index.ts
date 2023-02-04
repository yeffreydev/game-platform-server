import dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI || "",
  JWT_SECRET: process.env.JWT_SECRET || null,
};

export default config;
