import { Schema } from "mongoose";

export interface IPaint {
  _id: string;
  owner: Schema.Types.ObjectId;
  imageName: string;
  name: string;
  users: Schema.Types.ObjectId[];
  public: boolean; //default true - any user can view this paint
  createdAt: Date;
  updatedAt: Date;
}
