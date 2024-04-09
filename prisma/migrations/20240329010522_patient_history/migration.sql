-- CreateTable
CREATE TABLE "Questionary" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "questionsType" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Questionary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatientHistory" (
    "patient_id" INTEGER NOT NULL,
    "medic_id" INTEGER NOT NULL,
    "questionsAnwsers" JSONB NOT NULL,
    "questionary_id" INTEGER NOT NULL,

    CONSTRAINT "PatientHistory_pkey" PRIMARY KEY ("patient_id")
);

-- AddForeignKey
ALTER TABLE "PatientHistory" ADD CONSTRAINT "PatientHistory_questionary_id_fkey" FOREIGN KEY ("questionary_id") REFERENCES "Questionary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientHistory" ADD CONSTRAINT "PatientHistory_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patient"("patient_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientHistory" ADD CONSTRAINT "PatientHistory_medic_id_fkey" FOREIGN KEY ("medic_id") REFERENCES "Medic"("medic_id") ON DELETE RESTRICT ON UPDATE CASCADE;
