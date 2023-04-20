import { RequestHandler } from "express";
import { IBasicUser } from "../../types/user";
import Paint from "./model";

export const verifyPaintOwnership: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const user = req.user as IBasicUser | undefined;
  const findPaint = await Paint.findById(id);
  const ownerObjectId = findPaint?.owner;
  const ownerStringId = ownerObjectId?.toString();
  if (!findPaint) return res.status(404).json({ message: "Paint not found" });
  if (ownerStringId !== user?.id) return res.status(403).json({ message: "You are not allowed to do this" });
  next();
};
