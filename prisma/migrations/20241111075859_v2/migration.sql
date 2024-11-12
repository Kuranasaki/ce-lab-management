/*
  Warnings:

  - You are about to drop the column `requestedDate` on the `reservations` table. All the data in the column will be lost.
  - You are about to drop the column `testCategoryId` on the `reservations` table. All the data in the column will be lost.
  - Added the required column `organizationId` to the `reservations` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "reservations_testCategoryId_idx";

-- AlterTable
ALTER TABLE "reservations" DROP COLUMN "requestedDate",
DROP COLUMN "testCategoryId",
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "organizationId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "organizations" (
    "id" TEXT NOT NULL,
    "orgName" TEXT NOT NULL,
    "orgProjectName" TEXT,
    "orgAddress" TEXT NOT NULL,
    "orgEmail" TEXT NOT NULL,
    "orgPhone" TEXT NOT NULL,
    "orgFax" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test_items" (
    "id" TEXT NOT NULL,
    "testID" TEXT NOT NULL,
    "testItemID" TEXT NOT NULL,
    "testName" TEXT NOT NULL,
    "testAmount" DOUBLE PRECISION NOT NULL,
    "testPricePerUnit" DOUBLE PRECISION NOT NULL,
    "testUnit" TEXT NOT NULL,
    "testDetails" TEXT,
    "testNote" TEXT,
    "assignedProfessorName" TEXT,
    "markedAsDone" BOOLEAN,
    "certificateUploadedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "reservationId" TEXT NOT NULL,

    CONSTRAINT "test_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer_reservation_stats" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "totalReservations" INTEGER NOT NULL,
    "pendingCount" INTEGER NOT NULL,
    "approvedCount" INTEGER NOT NULL,
    "rejectedCount" INTEGER NOT NULL,
    "cancelledCount" INTEGER NOT NULL,
    "lastReservation" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customer_reservation_stats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "organizations_orgName_idx" ON "organizations"("orgName");

-- CreateIndex
CREATE INDEX "organizations_orgEmail_idx" ON "organizations"("orgEmail");

-- CreateIndex
CREATE INDEX "test_items_testID_idx" ON "test_items"("testID");

-- CreateIndex
CREATE INDEX "test_items_testItemID_idx" ON "test_items"("testItemID");

-- CreateIndex
CREATE INDEX "test_items_assignedProfessorName_idx" ON "test_items"("assignedProfessorName");

-- CreateIndex
CREATE INDEX "test_items_markedAsDone_idx" ON "test_items"("markedAsDone");

-- CreateIndex
CREATE UNIQUE INDEX "customer_reservation_stats_customerId_key" ON "customer_reservation_stats"("customerId");

-- CreateIndex
CREATE INDEX "reservations_createdAt_idx" ON "reservations"("createdAt");

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_items" ADD CONSTRAINT "test_items_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "reservations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
