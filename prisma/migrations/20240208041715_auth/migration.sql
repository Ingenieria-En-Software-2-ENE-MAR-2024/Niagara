-- DropForeignKey
ALTER TABLE "Answers" DROP CONSTRAINT "Answers_id_form_fkey";

-- CreateTable
CREATE TABLE "UserTest" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "UserTest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_id_form_fkey" FOREIGN KEY ("id_form") REFERENCES "Forms"("id") ON DELETE CASCADE ON UPDATE CASCADE;
