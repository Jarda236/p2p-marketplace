/*
  Warnings:

  - The `status` column on the `CounterOffer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Item` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Offer` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "CounterOffer" DROP COLUMN "status",
ADD COLUMN     "status" BOOLEAN;

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "status",
ADD COLUMN     "status" BOOLEAN;

-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "status",
ADD COLUMN     "status" BOOLEAN;
