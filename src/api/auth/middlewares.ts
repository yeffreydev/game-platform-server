import { RequestHandler } from "express";
import { validateEmail, validateUsername, validatePassword } from "./utils/validate";
import { IUser } from "../user/model";

export const validateSignupFields: RequestHandler = (req, res, next) => {
  const { email, username, password, terms } = req.body as IUser;

  const emailError = validateEmail(email);
  if (emailError) return res.status(400).json({ message: emailError });

  const usernameError = validateUsername(username);
  if (usernameError) return res.status(400).json({ message: usernameError });

  const passwordError = validatePassword(password);
  if (passwordError) return res.status(400).json({ message: passwordError });
  if (!terms) return res.status(400).json({ message: "Please accept terms and conditions" });
  next();
};
