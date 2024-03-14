/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `end_hour` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `id_medic` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `id_patient` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `start_hour` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Appointment` table. All the data in the column will be lost.
  - The primary key for the `Medic` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Medic` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Medic` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Medic` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Medic` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Medic` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Medic` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `UserTest` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `UserTest` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `UserTest` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `UserTest` table. All the data in the column will be lost.
  - Added the required column `medic_id` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patient_id` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `medic_id` to the `Medic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ci` to the `UserTest` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_id_medic_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_id_patient_fkey";

-- DropForeignKey
ALTER TABLE "Medic" DROP CONSTRAINT "Medic_userId_fkey";

-- DropIndex
DROP INDEX "Medic_userId_key";

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "end_hour",
DROP COLUMN "id_medic",
DROP COLUMN "id_patient",
DROP COLUMN "start_hour",
DROP COLUMN "updatedAt",
ADD COLUMN     "medic_id" INTEGER NOT NULL,
ADD COLUMN     "patient_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Medic" DROP CONSTRAINT "Medic_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "id",
DROP COLUMN "name",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "medic_id" INTEGER NOT NULL,
ADD CONSTRAINT "Medic_pkey" PRIMARY KEY ("medic_id");

-- AlterTable
ALTER TABLE "UserTest" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "role",
DROP COLUMN "updatedAt",
ADD COLUMN     "ci" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Admin" (
    "admin_id" INTEGER NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("admin_id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "patient_id" INTEGER NOT NULL,
    "speciality" TEXT NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("patient_id")
);

-- AddForeignKey
ALTER TABLE "Medic" ADD CONSTRAINT "Medic_medic_id_fkey" FOREIGN KEY ("medic_id") REFERENCES "UserTest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "UserTest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "UserTest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_medic_id_fkey" FOREIGN KEY ("medic_id") REFERENCES "Medic"("medic_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patient"("patient_id") ON DELETE RESTRICT ON UPDATE CASCADE;
