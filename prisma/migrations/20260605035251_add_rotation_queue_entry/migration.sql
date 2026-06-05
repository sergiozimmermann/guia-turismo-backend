-- CreateTable
CREATE TABLE "TourGuideAdhesion" (
    "id" TEXT NOT NULL,
    "guideId" TEXT NOT NULL,
    "adhesionDate" TIMESTAMP(3) NOT NULL,
    "validityDate" TIMESTAMP(3) NOT NULL,
    "paymentDate" TIMESTAMP(3),
    "paymentStatus" TEXT NOT NULL DEFAULT 'pending',
    "amount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TourGuideAdhesion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Commission" (
    "id" TEXT NOT NULL,
    "guideId" TEXT NOT NULL,
    "guideName" TEXT NOT NULL,
    "percentage" DOUBLE PRECISION NOT NULL,
    "effectiveDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Commission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmergencyContact" (
    "id" TEXT NOT NULL,
    "guideId" TEXT NOT NULL,
    "guideName" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "relationship" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmergencyContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,
    "targetType" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'new',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Warning" (
    "id" TEXT NOT NULL,
    "guideId" TEXT NOT NULL,
    "guideName" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "issuedBy" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Warning_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RotationQueueEntry" (
    "id" TEXT NOT NULL,
    "guideId" TEXT NOT NULL,
    "guideName" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RotationQueueEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Penalty" (
    "id" TEXT NOT NULL,
    "guideId" TEXT NOT NULL,
    "guideName" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "amount" DOUBLE PRECISION,
    "duration" INTEGER,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "issuedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Penalty_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RotationQueueEntry_guideId_key" ON "RotationQueueEntry"("guideId");

-- AddForeignKey
ALTER TABLE "TourGuideAdhesion" ADD CONSTRAINT "TourGuideAdhesion_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "TourGuide"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
