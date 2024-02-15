-- DropForeignKey
ALTER TABLE "Answers" DROP CONSTRAINT "Answers_id_form_fkey";


-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_id_form_fkey" FOREIGN KEY ("id_form") REFERENCES "Forms"("id") ON DELETE CASCADE ON UPDATE CASCADE;
