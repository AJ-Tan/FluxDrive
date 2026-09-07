/*
  Warnings:

  - You are about to drop the column `expireAt` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "expireAt",
ADD COLUMN     "expiresAt" TIMESTAMP(3);
