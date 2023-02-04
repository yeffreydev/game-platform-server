import { Model, model, Schema } from "mongoose";

export interface IUser {
  id?: string;
  username: string;
  email: string;
  password: string;
}

interface IuserModel extends IUser, Model<IUser> {
  // add custom methods here
}

const userSchema = new Schema<IUser>({
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

const User = model<IUser, IuserModel>("User", userSchema);

export default User;
