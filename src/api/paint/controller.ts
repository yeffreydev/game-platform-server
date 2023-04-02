import { RequestHandler } from "express";
import { IPaint } from "../../types/paint";
import Paint from "./model";
import { IBasicUser } from "../../types/user";

export const createPaint: RequestHandler = async (req, res, next) => {
  try {
    //image name from multer generate in middleware
    const imageName = req.file?.filename;
    //user from auth
    const user = req.user as IBasicUser | undefined;

    //user id
    const userId = user?.id;

    //paint name
    const { name } = req.body as IPaint;

    //first user
    const users = [userId];

    //generate new paint and save
    const newPaint = new Paint({ users, name, imageName, owner: userId });
    const savedPaint = await newPaint.save();
    res.status(200).json(savedPaint);
  } catch (error) {
    next(error);
  }
};
export const getPaintsByUser: RequestHandler = (req, res, next) => {};
export const getPaintById: RequestHandler = (req, res, next) => {};
export const updatePaintById: RequestHandler = (req, res, next) => {};
export const deletePaintById: RequestHandler = (req, res, next) => {};
