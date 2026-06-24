import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import "dotenv/config";
import prisma from "../database/database.config.js";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_ACCESS,
};

passport.use(
  new Strategy(options, async (payload, done) => {
    try {
      const user = await prisma.user.findUnique({ where: { id: payload.id } });
      if (!user)
        return done(null, false, {
          status: 401,
          name: "InvalidToken",
          message: "User was not found from the provided access token.",
          errorDetails: {
            payloadDetails: payload,
          },
        });

      done(null, user);
    } catch (err) {
      done(err);
    }
  }),
);

export default passport;
