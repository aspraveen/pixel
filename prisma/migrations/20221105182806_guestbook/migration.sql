/*
  Warnings:

  - You are about to drop the `VisitorBook` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "VisitorBook";

-- CreateTable
CREATE TABLE "GuestBook" (
    "id" SERIAL NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "captchaScore" VARCHAR(10) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "ip" VARCHAR(25),
    "browser" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "GuestBook_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GuestBook" ADD CONSTRAINT "GuestBook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
