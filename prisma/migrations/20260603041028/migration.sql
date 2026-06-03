/*
  Warnings:

  - A unique constraint covering the columns `[tokenId]` on the table `TourGuide` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "TourGuide" ADD COLUMN     "tokenCreatedAt" TIMESTAMP(3),
ADD COLUMN     "tokenHash" TEXT,
ADD COLUMN     "tokenId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "TourGuide_tokenId_key" ON "TourGuide"("tokenId");
