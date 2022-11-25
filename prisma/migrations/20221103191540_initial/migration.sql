/*
  Warnings:

  - You are about to drop the column `paymetMethod` on the `Diary` table. All the data in the column will be lost.
  - Added the required column `paymentMethod` to the `Diary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Diary" DROP COLUMN "paymetMethod",
ADD COLUMN     "paymentMethod" VARCHAR(25) NOT NULL;
