/*
  Warnings:

  - A unique constraint covering the columns `[productVariantId,productOptionValueId]` on the table `VariantValue` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "VariantValue_productVariantId_productOptionValueId_key" ON "VariantValue"("productVariantId", "productOptionValueId");
