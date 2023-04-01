import { Model, model, Schema } from "mongoose";

export interface IUser {
  _id?: string;
  username: string;
  email: string;
  terms: boolean;
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
  terms: {
    type: Boolean,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = model<IUser, IuserModel>("User", userSchema);

export default User;
