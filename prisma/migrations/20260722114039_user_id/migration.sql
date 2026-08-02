/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `SellerRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SellerRequest_userId_key" ON "SellerRequest"("userId");
