-- AlterTable
ALTER TABLE "Seller" ADD COLUMN     "location" TEXT NOT NULL DEFAULT 'shiraz',
ALTER COLUMN "phone" DROP DEFAULT;
