import { refreshAccess } from "../../utils/jwt.js";

const protectedController = (req, res) => {
  const user = req.user;
  res.status(200).json({
    ok: true,
    name: "AuthorizedAccess",
    data: {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: user.createdAt,
      },
    },
  });
};

const refreshController = (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  const { token, error } = refreshAccess(refreshToken);

  if (error) return next(error);

  res.status(200).json({
    ok: true,
    name: "RefreshSuccess",
    message: "User has successfully refreshed the access token.",
    data: {
      token,
    },
  });
};

export { protectedController, refreshController };
