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
export const getPaintsByUser: RequestHandler = async (req, res, next) => {
  try {
    const user = req.user as IBasicUser | undefined;
    const userPaints = await Paint.find({ owner: user?.id });
    res.status(200).json(userPaints);
  } catch (e) {
    console.log(e);
    res.status(501).json({ message: "server error: find userPaints" });
  }
};
export const getPaintById: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const paint = await Paint.findById(id);
    if (!paint) return res.status(404).json({ message: "Paint not found" });
    res.status(200).json(paint);
  } catch (e) {
    console.log(e);
    res.status(501).json({ message: "server error: find paint by id" });
  }
};
export const updatePaintById: RequestHandler = (req, res, next) => {};
export const deletePaintById: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Paint.findByIdAndDelete(id);
    res.status(200).json({ message: "paint deleted" });
  } catch (e) {
    console.log(e);
    res.status(501).json({ message: "server error: delete paint by id" });
  }
};

//painting
//save paint
export const savePaint: RequestHandler = (req, res, next) => {
  try {
    const imageName = req.file?.filename;
    if (!imageName) return res.status(301).json({ message: "file not saved" });
    return res.status(200).json({ name: imageName });
  } catch (e) {
    console.log(e);
    res.status(501).json({ message: "error in server" });
  }
};
