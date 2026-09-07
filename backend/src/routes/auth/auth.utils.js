import { deleteCloudinaryFolderFiles } from "../folder/folder.utils.js";
import prisma from "../../config/database/database.config.js";

export const clearGuest = async (userId) => {
  await deleteCloudinaryFolderFiles(`${userId}-1`);
  await prisma.user.delete({ where: { id: userId } });
};
