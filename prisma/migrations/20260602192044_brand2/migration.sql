/*
  Warnings:

  - Added the required column `url` to the `Brand` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Brand" ADD COLUMN     "url" TEXT NOT NULL,
ALTER COLUMN "icon" DROP NOT NULL;
