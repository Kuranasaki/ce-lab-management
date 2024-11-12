/*
  Warnings:

  - You are about to drop the column `organizationId` on the `reservations` table. All the data in the column will be lost.
  - You are about to drop the `test_items` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `orgDataId` to the `reservations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "reservations" DROP CONSTRAINT "reservations_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "test_items" DROP CONSTRAINT "test_items_reservationId_fkey";

-- AlterTable
ALTER TABLE "reservations" DROP COLUMN "organizationId",
ADD COLUMN     "orgDataId" TEXT NOT NULL;

-- DropTable
DROP TABLE "test_items";

-- CreateTable
CREATE TABLE "test_entries" (
    "id" TEXT NOT NULL,
    "reservationId" TEXT NOT NULL,
    "testType" TEXT NOT NULL,
    "testID" TEXT NOT NULL,
    "testItemID" TEXT NOT NULL,
    "testName" TEXT NOT NULL,
    "testAmount" DOUBLE PRECISION NOT NULL,
    "testPricePerUnit" DOUBLE PRECISION NOT NULL,
    "testUnit" TEXT NOT NULL,
    "testDetails" TEXT,
    "testNote" TEXT,
    "assignedProfessorId" TEXT,
    "assignedProfessorName" TEXT,
    "markedAsDone" BOOLEAN,
    "certificateUploadedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "test_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization_stats" (
    "id" TEXT NOT NULL,
    "orgName" TEXT NOT NULL,
    "reservationCount" INTEGER NOT NULL,
    "lastReservation" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organization_stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test_stats" (
    "id" TEXT NOT NULL,
    "testID" TEXT NOT NULL,
    "testName" TEXT NOT NULL,
    "usageCount" INTEGER NOT NULL,
    "lastUsed" TIMESTAMP(3),
    "averageAmount" DOUBLE PRECISION NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "test_stats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "test_entries_testType_idx" ON "test_entries"("testType");

-- CreateIndex
CREATE INDEX "test_entries_testID_idx" ON "test_entries"("testID");

-- CreateIndex
CREATE INDEX "test_entries_testItemID_idx" ON "test_entries"("testItemID");

-- CreateIndex
CREATE INDEX "test_entries_assignedProfessorId_idx" ON "test_entries"("assignedProfessorId");

-- CreateIndex
CREATE INDEX "test_entries_markedAsDone_idx" ON "test_entries"("markedAsDone");

-- CreateIndex
CREATE INDEX "test_entries_reservationId_idx" ON "test_entries"("reservationId");

-- CreateIndex
CREATE UNIQUE INDEX "organization_stats_orgName_key" ON "organization_stats"("orgName");

-- CreateIndex
CREATE INDEX "organization_stats_orgName_idx" ON "organization_stats"("orgName");

-- CreateIndex
CREATE INDEX "organization_stats_reservationCount_idx" ON "organization_stats"("reservationCount");

-- CreateIndex
CREATE UNIQUE INDEX "test_stats_testID_key" ON "test_stats"("testID");

-- CreateIndex
CREATE INDEX "test_stats_testID_idx" ON "test_stats"("testID");

-- CreateIndex
CREATE INDEX "test_stats_usageCount_idx" ON "test_stats"("usageCount");

-- CreateIndex
CREATE INDEX "customer_reservation_stats_customerId_idx" ON "customer_reservation_stats"("customerId");

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_orgDataId_fkey" FOREIGN KEY ("orgDataId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_entries" ADD CONSTRAINT "test_entries_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "reservations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
