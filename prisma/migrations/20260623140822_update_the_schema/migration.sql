/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Offer" ADD COLUMN     "status" "Status";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "slug" TEXT,
ADD COLUMN     "soldCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "status" "Status";

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
