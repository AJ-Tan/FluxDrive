import passport from "./passport.config.js";

// JWT auth guard.
// This middleware checks the request for a valid signed JWT and attaches the authenticated user to req.user.
const passportAuth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, details) => {
    if (err) return next(err);
    if (!user) return next(details);
    req.user = user;
    next();
  })(req, res, next);
};

export default passportAuth;
