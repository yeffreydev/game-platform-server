import { connect } from "mongoose";
import config from ".";
const connectDb = async () => {
  try {
    const conn = await connect(config.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.name}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDb();
