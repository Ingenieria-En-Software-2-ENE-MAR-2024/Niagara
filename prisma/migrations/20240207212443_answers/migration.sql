/*
  Warnings:

  - Made the column `questions` on table `Forms` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Forms" ALTER COLUMN "questions" SET NOT NULL;

-- CreateTable
CREATE TABLE "Answers" (
    "id" SERIAL NOT NULL,
    "questions" JSONB NOT NULL,
    "id_form" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Answers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_id_form_fkey" FOREIGN KEY ("id_form") REFERENCES "Forms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
