/*
  Warnings:

  - Added the required column `speciality` to the `Medic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Medic" ADD COLUMN     "speciality" TEXT NOT NULL;
