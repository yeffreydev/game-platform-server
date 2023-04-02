import { Model, Schema, model } from "mongoose";
import { IPaint } from "../../types/paint";

export interface IPaintModel extends IPaint, Model<IPaint> {
  //Add your custom methods here.
}

export const paintSchema = new Schema<IPaintModel>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    imageName: {
      type: String,
      required: true,
    },
    users: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
    public: {
      type: Boolean,
      required: true,
      default: true,
    },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Paint = model<IPaintModel>("Paint", paintSchema);
export default Paint;
