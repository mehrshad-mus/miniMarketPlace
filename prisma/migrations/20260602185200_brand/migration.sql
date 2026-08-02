/*
  Warnings:

  - You are about to drop the column `sku` on the `VariantValue` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `VariantValue` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sku]` on the table `ProductVariant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sku` to the `ProductVariant` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "VariantValue_sku_key";

-- AlterTable
ALTER TABLE "ProductVariant" ADD COLUMN     "sku" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "VariantValue" DROP COLUMN "sku",
DROP COLUMN "value";

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariant_sku_key" ON "ProductVariant"("sku");
