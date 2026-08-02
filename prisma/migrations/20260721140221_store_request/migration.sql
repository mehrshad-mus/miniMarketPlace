/*
  Warnings:

  - You are about to drop the column `password` on the `SellerRequest` table. All the data in the column will be lost.
  - Added the required column `location` to the `SellerRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SellerRequest" DROP COLUMN "password",
ADD COLUMN     "isAdminSeen" "AdminState" NOT NULL DEFAULT 'DOSENTSEEN',
ADD COLUMN     "location" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "location" TEXT;
