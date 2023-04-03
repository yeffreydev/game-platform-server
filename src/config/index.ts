import dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: process.env.PORT || "8080",
  MONGO_URI: process.env.MONGO_URI || "",
  JWT_SECRET: process.env.JWT_SECRET || null,
  ORIGIN: process.env.ORIGIN,
};

export default config;
