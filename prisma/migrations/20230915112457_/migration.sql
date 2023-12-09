/*
  Warnings:

  - You are about to drop the column `images` on the `Tour` table. All the data in the column will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Tour" DROP COLUMN "images";

-- DropTable
DROP TABLE "Image";

-- CreateTable
CREATE TABLE "TourImage" (
    "id" SERIAL NOT NULL,
    "image" TEXT,
    "tour_id" INTEGER NOT NULL,

    CONSTRAINT "TourImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TourImage" ADD CONSTRAINT "TourImage_tour_id_fkey" FOREIGN KEY ("tour_id") REFERENCES "Tour"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
