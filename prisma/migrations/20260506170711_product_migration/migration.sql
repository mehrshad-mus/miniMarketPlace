/*
  Warnings:

  - You are about to drop the column `titel` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `ProductOption` table. All the data in the column will be lost.
  - You are about to drop the column `productOptinValueId` on the `VariantValue` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sku]` on the table `VariantValue` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productOptionValueId` to the `VariantValue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sku` to the `VariantValue` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "VariantValue" DROP CONSTRAINT "VariantValue_productOptinValueId_fkey";

-- DropIndex
DROP INDEX "VariantValue_productOptinValueId_idx";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "titel",
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProductOption" DROP COLUMN "value";

-- AlterTable
ALTER TABLE "VariantValue" DROP COLUMN "productOptinValueId",
ADD COLUMN     "productOptionValueId" TEXT NOT NULL,
ADD COLUMN     "sku" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "CreatedOption" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CreatedOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreatedOptionValue" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdOptionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CreatedOptionValue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VariantValue_sku_key" ON "VariantValue"("sku");

-- CreateIndex
CREATE INDEX "VariantValue_productOptionValueId_idx" ON "VariantValue"("productOptionValueId");

-- AddForeignKey
ALTER TABLE "VariantValue" ADD CONSTRAINT "VariantValue_productOptionValueId_fkey" FOREIGN KEY ("productOptionValueId") REFERENCES "ProductOptionValue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreatedOptionValue" ADD CONSTRAINT "CreatedOptionValue_createdOptionId_fkey" FOREIGN KEY ("createdOptionId") REFERENCES "CreatedOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
