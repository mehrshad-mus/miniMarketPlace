-- CreateEnum
CREATE TYPE "AdminState" AS ENUM ('DOSENTSEEN', 'SEEN');

-- AlterTable
ALTER TABLE "ProductRequest" ADD COLUMN     "isAdminSeen" "AdminState" NOT NULL DEFAULT 'DOSENTSEEN';
