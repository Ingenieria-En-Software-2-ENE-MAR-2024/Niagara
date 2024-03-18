/*
  Warnings:

  - Added the required column `role` to the `UserTest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserTest" ADD COLUMN     "role" TEXT NOT NULL;
