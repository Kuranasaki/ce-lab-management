-- CreateTable
CREATE TABLE "Statement" (
    "taskID" UUID NOT NULL,
    "profID" VARCHAR(256) NOT NULL,
    "wage" DECIMAL(15,2) NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Statement_pkey" PRIMARY KEY ("taskID")
);
