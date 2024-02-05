-- CreateTable
CREATE TABLE "Forms" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "questions" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Forms_pkey" PRIMARY KEY ("id")
);

-- InsertData
INSERT INTO "Forms" ("title","questions", "updatedAt") VALUES ('Formulario de Prueba',
'
  [
    {
      "id": "q1",
      "type": "single-choice",
      "label":" Pregunta de Selección Simple",
      "options": ["Opción 1", "Opción 2", "Opción 3"]
    },
    {
      "id": "q2",
      "type": "multiple-choice",
      "label": "Pregunta de Selección Múltiple",
      "options": ["Opción A", "Opción B", "Opción C"]
    },
    {
      "id": "q3",
      "type": "file-upload",
      "label": "Carga de Archivos"
    },
    {
      "id": "q4",
      "type": "short-text",
      "label": "Área de Texto Corto"
    },
    {
      "id": "q5",
      "type": "long-text",
      "label": "Área de Texto Largo"
    }
  ]
', CURRENT_TIMESTAMP
);
