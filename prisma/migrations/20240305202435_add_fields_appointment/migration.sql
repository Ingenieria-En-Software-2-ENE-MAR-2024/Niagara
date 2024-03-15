/*
  Warnings:

  - You are about to drop the column `date` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `hour` on the `Appointment` table. All the data in the column will be lost.
  - Added the required column `end_date` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_hour` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_hour` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "date",
DROP COLUMN "hour",
ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "end_hour" TEXT NOT NULL,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "start_hour" TEXT NOT NULL;
