import { RequestHandler } from "express";
import { validateEmail, validateUsername, validatePassword } from "./utils/validate";
import { IUser } from "../user/model";

export const validateSignupFields: RequestHandler = (req, res, next) => {
  const { email, username, password } = req.body as IUser;

  if (!validateEmail(email)) {
    res.status(400).json({ error: "Invalid email address" });
    return;
  }

  if (!validateUsername(username)) {
    res.status(400).json({ error: "Invalid username" });
    return;
  }

  if (!validatePassword(password)) {
    res.status(400).json({ error: "Invalid password" });
    return;
  }

  next();
};
