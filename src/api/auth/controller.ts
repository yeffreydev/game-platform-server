import { RequestHandler } from "express";
import Token from "../token/model";
import passport from "passport";
import jwt from "jsonwebtoken";
import config from "../../config";
import "./utils/passport";

export const login: RequestHandler = async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err) return next(err);
      if (!user) return res.status(400).json({ message: info.message });
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        const body = { id: user._id };
        const token = jwt.sign(body, config.JWT_SECRET!, { expiresIn: "30d" });
        await Token.create({ userId: user._id, token, expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) });
        return res.json({ message: "Logged in successfully", user: { token, auth: true } });
      });
    } catch (e) {
      return next(e);
    }
  })(req, res, next);
};

export const signup: RequestHandler = async (req, res, next) => {
  passport.authenticate("signup", async (err, user, info) => {
    try {
      if (err) return next(err);
      if (!user) return res.status(400).json({ message: info.message });
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        const body = { id: user._id };
        const token = jwt.sign(body, config.JWT_SECRET!, { expiresIn: "30d" });
        await Token.create({ userId: user._id, token, expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) });
        return res.json({ message: "Logged in successfully", user: { token, auth: true } });
      });
    } catch (e) {
      return next(e);
    }
  })(req, res, next);
};
