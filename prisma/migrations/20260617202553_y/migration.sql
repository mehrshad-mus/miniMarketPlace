-- DropForeignKey
ALTER TABLE "VariantValue" DROP CONSTRAINT "VariantValue_productVariantId_fkey";

-- AddForeignKey
ALTER TABLE "VariantValue" ADD CONSTRAINT "VariantValue_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "ProductVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
