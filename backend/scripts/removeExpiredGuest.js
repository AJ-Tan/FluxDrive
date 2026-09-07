import prisma from "../src/config/database/database.config.js";
import { clearGuest } from "../src/routes/auth/auth.utils.js";

const removeExpiredGuest = async () => {
  try {
    const expiredGuestAccounts = await prisma.user.findMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });

    for (const expiredGuest of expiredGuestAccounts) {
      console.log(`Clearing guest in database: ${expiredGuest.id}`);
      clearGuest(expiredGuest.id);
    }
  } catch (err) {
    console.log(err);
  }
};

removeExpiredGuest();
