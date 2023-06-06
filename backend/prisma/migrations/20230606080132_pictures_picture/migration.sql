/*
  Warnings:

  - You are about to drop the column `pictures` on the `Offer` table. All the data in the column will be lost.
  - Added the required column `picture` to the `Offer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "pictures",
ADD COLUMN     "picture" TEXT NOT NULL;
