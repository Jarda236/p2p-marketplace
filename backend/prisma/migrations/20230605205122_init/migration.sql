/*
  Warnings:

  - You are about to drop the column `creatorId` on the `CounterOffer` table. All the data in the column will be lost.
  - Added the required column `userId` to the `CounterOffer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password_hash` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CounterOffer" DROP CONSTRAINT "CounterOffer_creatorId_fkey";

-- AlterTable
ALTER TABLE "CounterOffer" DROP COLUMN "creatorId",
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password_hash" TEXT NOT NULL,
ALTER COLUMN "image" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "CounterOffer" ADD CONSTRAINT "CounterOffer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
