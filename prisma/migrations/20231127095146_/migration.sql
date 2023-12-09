-- DropForeignKey
ALTER TABLE "ArticleImage" DROP CONSTRAINT "ArticleImage_articleId_fkey";

-- DropForeignKey
ALTER TABLE "TourImage" DROP CONSTRAINT "TourImage_tourId_fkey";

-- AddForeignKey
ALTER TABLE "TourImage" ADD CONSTRAINT "TourImage_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "Tour"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleImage" ADD CONSTRAINT "ArticleImage_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;
