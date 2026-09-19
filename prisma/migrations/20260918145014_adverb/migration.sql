-- CreateTable
CREATE TABLE "ProductAd" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "status" "Status" DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductAd_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductAdFeature" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "productAdId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductAdFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductAdFeatureValue" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "productAdFeatureId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductAdFeatureValue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProductAd_status_idx" ON "ProductAd"("status");

-- CreateIndex
CREATE INDEX "ProductAdFeature_productAdId_idx" ON "ProductAdFeature"("productAdId");

-- CreateIndex
CREATE INDEX "ProductAdFeatureValue_productAdFeatureId_idx" ON "ProductAdFeatureValue"("productAdFeatureId");

-- AddForeignKey
ALTER TABLE "ProductAdFeature" ADD CONSTRAINT "ProductAdFeature_productAdId_fkey" FOREIGN KEY ("productAdId") REFERENCES "ProductAd"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductAdFeatureValue" ADD CONSTRAINT "ProductAdFeatureValue_productAdFeatureId_fkey" FOREIGN KEY ("productAdFeatureId") REFERENCES "ProductAdFeature"("id") ON DELETE CASCADE ON UPDATE CASCADE;
