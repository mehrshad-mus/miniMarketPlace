/*
  Warnings:

  - You are about to drop the column `brand` on the `ProductRequest` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `ProductRequest` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `ProductRequest` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `ProductRequest` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `ProductRequest` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `brandId` to the `ProductRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `ProductRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductRequest" DROP COLUMN "brand",
DROP COLUMN "category",
DROP COLUMN "data",
DROP COLUMN "images",
ADD COLUMN     "brandId" TEXT NOT NULL,
ADD COLUMN     "categoryId" TEXT NOT NULL,
ADD COLUMN     "options" JSONB,
ADD COLUMN     "seoExplanation" TEXT,
ADD COLUMN     "seoTitle" TEXT,
ADD COLUMN     "seoWord" TEXT,
ADD COLUMN     "showComment" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "showView" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "slug" TEXT,
ADD COLUMN     "specialProduct" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tag" TEXT,
ADD COLUMN     "warningAndDetail" TEXT,
ALTER COLUMN "status" SET DEFAULT 'PENDING',
ALTER COLUMN "description" DROP NOT NULL;

-- CreateTable
CREATE TABLE "ProductRequestImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "altText" TEXT,
    "productRequestId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductRequestImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductRequest_slug_key" ON "ProductRequest"("slug");

-- AddForeignKey
ALTER TABLE "ProductRequest" ADD CONSTRAINT "ProductRequest_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductRequest" ADD CONSTRAINT "ProductRequest_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductRequestImage" ADD CONSTRAINT "ProductRequestImage_productRequestId_fkey" FOREIGN KEY ("productRequestId") REFERENCES "ProductRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
