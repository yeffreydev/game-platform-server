import { Model, model, Schema } from "mongoose";

interface Iuser {
  id?: string;
  username: string;
  email: string;
  password: string;
}

interface IuserModel extends Iuser, Model<Iuser> {
  // add custom methods here
}

const userSchema = new Schema<Iuser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = model<Iuser, IuserModel>("User", userSchema);

export default User;
