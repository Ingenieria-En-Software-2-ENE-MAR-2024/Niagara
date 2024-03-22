-- CreateEnum
CREATE TYPE "EdLevel" AS ENUM ('NONE', 'PREG', 'POSTG');

-- CreateTable
CREATE TABLE "Profile" (
    "user_id" INTEGER NOT NULL,
    "vision" TEXT DEFAULT '',
    "skills" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "ed_lvl" "EdLevel" NOT NULL DEFAULT 'NONE',
    "prof_formation" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "events" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "presentations" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "publications" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "grants" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("user_id")
);

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "UserTest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
