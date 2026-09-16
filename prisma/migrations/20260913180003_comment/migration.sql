/*
  Warnings:

  - You are about to drop the column `Strength` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `weacness` on the `Comment` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Comment_userId_productId_key";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "Strength",
DROP COLUMN "weacness",
ADD COLUMN     "strength" TEXT,
ADD COLUMN     "weakness" TEXT;
