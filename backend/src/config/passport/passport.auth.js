import passport from "./passport.config.js";

const passportAuth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, details) => {
    if (err) return next(err);
    if (!user) return next(details);
    req.user = user;
    next();
  })(req, res, next);
};

export default passportAuth;
