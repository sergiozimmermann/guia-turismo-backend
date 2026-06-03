-- CreateEnum
CREATE TYPE "TourGroupStatus" AS ENUM ('pending', 'guide_linked');

-- AlterTable
ALTER TABLE "TourGroup" ADD COLUMN     "guideId" TEXT,
ADD COLUMN     "status" "TourGroupStatus" NOT NULL DEFAULT 'pending';

-- CreateTable
CREATE TABLE "TourGuide" (
    "id" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "legalRepresentativeCpf" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "licenseNumber" TEXT,
    "languages" TEXT,
    "address" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TourGuide_pkey" PRIMARY KEY ("id")
);
