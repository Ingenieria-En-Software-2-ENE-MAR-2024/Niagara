/*
  Warnings:

  - You are about to drop the column `title` on the `Questionary` table. All the data in the column will be lost.
  - Added the required column `admin_id` to the `Questionary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Questionary" DROP COLUMN "title",
ADD COLUMN     "admin_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Questionary" ADD CONSTRAINT "Questionary_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "Admin"("admin_id") ON DELETE RESTRICT ON UPDATE CASCADE;
