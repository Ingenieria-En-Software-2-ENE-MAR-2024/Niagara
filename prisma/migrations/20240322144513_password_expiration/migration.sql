-- CreateTable
CREATE TABLE "PasswordExpiration" (
    "user_id" INTEGER NOT NULL,
    "expirationDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PasswordExpiration_pkey" PRIMARY KEY ("user_id")
);

-- AddForeignKey
ALTER TABLE "PasswordExpiration" ADD CONSTRAINT "PasswordExpiration_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "UserTest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
