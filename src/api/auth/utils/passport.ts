import passport from "passport";
import { Strategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { IUser } from "../../user/model";
import { encryptPassword, comparePassword } from "./encryptPassword";
import User from "../../user/model";
import config from "../../../config";

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT_SECRET!,
};

//singup new User with passport js
passport.use(
  "signup",
  new Strategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      let user: IUser = {
        username,
        email: req.body.email,
        terms: req.body.terms,
        password: await encryptPassword(password),
      };
      try {
        let findUerByusername = await User.findOne({ username });
        if (findUerByusername) return done(null, false, { message: "username already exists" });
        let findUserByEmail = await User.findOne({ email: req.body.email });
        if (findUserByEmail) return done(null, false, { message: "email already exists" });
        let newUser = await User.create(user);
        return done(null, newUser);
      } catch (e) {
        done(e);
      }
    }
  )
);

//login user with passport js
passport.use(
  "login",
  new Strategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      try {
        const user: IUser | null = await User.findOne({ $or: [{ username }, { email: username }] });
        //user not found next line
        if (!user) return done(null, false, { message: "username or password invalid" });
        const isValid = await comparePassword(password, user.password);
        if (!isValid) return done(null, false, { message: "username or password invalid" });
        return done(null, user);
      } catch (e) {
        console.log(e);
        done(e);
      }
    }
  )
);

//jwt strategy
passport.use(
  new JWTStrategy(jwtOpts, async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload.id);
      if (!user) return done(null, false);
      return done(null, user);
    } catch (e) {
      done(e);
    }
  })
);
