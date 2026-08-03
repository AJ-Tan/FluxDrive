import prisma from "../../config/database/database.config.js";

const folderBaseMiddleware = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user)
      return next({
        status: 404,
        name: "UserNotFound",
        message: "User was not found when running folderBaseMiddleware.",
      });
    const baseFolder = await prisma.folder.findUnique({
      where: { id: `${user.id}-1` },
    });
    if (!baseFolder)
      await prisma.folder.create({
        data: { id: `${user.id}-1`, name: "My Drive", ownerId: user.id },
      });

    next();
  } catch (err) {
    next(err);
  }
};

export default folderBaseMiddleware;
