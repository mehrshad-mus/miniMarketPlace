/*
  Warnings:

  - You are about to drop the column `productOptionvalueId` on the `ProductImage` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `ProductVariant` table. All the data in the column will be lost.
  - Added the required column `productId` to the `ProductImage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductImage" DROP CONSTRAINT "ProductImage_productOptionvalueId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "englishTitle" TEXT,
ADD COLUMN     "seoExplanation" TEXT,
ADD COLUMN     "seoTitle" TEXT,
ADD COLUMN     "showComment" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "showView" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "specialProduct" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tag" TEXT,
ADD COLUMN     "warningAndDetail" TEXT;

-- AlterTable
ALTER TABLE "ProductImage" DROP COLUMN "productOptionvalueId",
ADD COLUMN     "productId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProductVariant" DROP COLUMN "name",
ALTER COLUMN "sku" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
