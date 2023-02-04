import { Model, model, Schema } from "mongoose";

interface IToken {
  userId: string;
  token: string;
  expires: Date;
  isValid: boolean;
}

interface ITokenModel extends IToken, Model<IToken> {
  // add custom methods here
}

const tokenSchema = new Schema<IToken>({
  userId: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  expires: {
    type: Date,
    required: true,
  },
  isValid: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const Token = model<IToken, ITokenModel>("Token", tokenSchema);

export default Token;
