-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');

-- CreateTable
CREATE TABLE "TourGuideAvailability" (
    "id" TEXT NOT NULL,
    "tourGuideId" TEXT NOT NULL,
    "dayOfWeek" "DayOfWeek" NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TourGuideAvailability_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TourGuideAvailability" ADD CONSTRAINT "TourGuideAvailability_tourGuideId_fkey" FOREIGN KEY ("tourGuideId") REFERENCES "TourGuide"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
