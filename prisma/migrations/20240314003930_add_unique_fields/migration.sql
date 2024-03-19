/*
  Warnings:

  - You are about to drop the column `speciality` on the `Patient` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `UserTest` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ci]` on the table `UserTest` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "speciality";

-- CreateIndex
CREATE UNIQUE INDEX "UserTest_email_key" ON "UserTest"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserTest_ci_key" ON "UserTest"("ci");
