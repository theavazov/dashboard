/*
  Warnings:

  - Made the column `code` on table `Language` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Language" ALTER COLUMN "code" SET NOT NULL;

-- CreateTable
CREATE TABLE "Siteinfo" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "title" JSONB NOT NULL,
    "subtitle" JSONB,
    "description" JSONB,
    "number" TEXT,
    "address" JSONB,
    "map" TEXT,
    "email" TEXT,
    "telegram" TEXT,
    "instagram" TEXT,
    "youtube" TEXT,
    "facebook" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Siteinfo_pkey" PRIMARY KEY ("id")
);
