/*
  Warnings:

  - Added the required column `latitude` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "latitude" BIGINT NOT NULL,
ADD COLUMN     "longitude" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "latitude" BIGINT,
ADD COLUMN     "longitude" BIGINT;
