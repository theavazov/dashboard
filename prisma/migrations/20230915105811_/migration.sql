/*
  Warnings:

  - The `description` column on the `Tour` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `name` on the `Tour` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Tour" DROP COLUMN "name",
ADD COLUMN     "name" JSONB NOT NULL,
DROP COLUMN "description",
ADD COLUMN     "description" JSONB;
