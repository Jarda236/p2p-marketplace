/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToOffer` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `updatedAt` on table `CounterOffer` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToOffer" DROP CONSTRAINT "_CategoryToOffer_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToOffer" DROP CONSTRAINT "_CategoryToOffer_B_fkey";

-- AlterTable
ALTER TABLE "CounterOffer" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Offer" ADD COLUMN     "category" TEXT[];

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "_CategoryToOffer";
