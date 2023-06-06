-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_counterOfferId_fkey";

-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "offerId" DROP NOT NULL,
ALTER COLUMN "counterOfferId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_counterOfferId_fkey" FOREIGN KEY ("counterOfferId") REFERENCES "CounterOffer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
