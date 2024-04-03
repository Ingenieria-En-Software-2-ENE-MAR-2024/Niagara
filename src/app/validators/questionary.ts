import { z } from "zod";


const  QuestionsType  = [
    "TEXT",
    "SIMPLE_SELECT",
    "MULTIPLE_SELECT",
    "SIMPLE_SELECT_OTHERS", // caso texto plano porque un usuario agrega una respuesta
    "MULTIPLE_SELECT_OTHERS", // caso texto plano porque un usuario agrega una respuesta
    "NUMBER",
    "DATE"
] as const;

export const history_template_schema = z.object({
    type: z.enum(QuestionsType),
    options: z.array(z.string()).optional(),
    question: z.string(),
    section: z.array(z.string()) // es para que el front sepa renderizar las preguntas por secciones  puede ser por ejemplo ["Datos personales"]
    // Si es de secciones anidadas puede ser ["Datos personales", "Datos de contacto"] donde cada item representa un nivel de la seccion anidada.
    // si el tipo es  multiple se aceptara un array de strings
    // Si es de tipo text o select se aceptara un string
    // Si es de tipo number se aceptara un number nada de floats solo enteros
    // Si es de tipo date se aceptara un string

    // answer: z.array(z.string()).or(z.string()).or(z.number()),
  });

  const questionsTypeSchema = z.array(history_template_schema);


  export const history_template_create_object_body = z.object({
        QuestionType: questionsTypeSchema
  })




  export type Thistory_template_create_body = z.infer<
  typeof history_template_create_object_body
>

export const validator_history_template = (
  body: Thistory_template_create_body,
) => {
  const its_valdiate = history_template_create_object_body.parse(body)
  return its_valdiate
}





// Define el esquema para el objeto de respuesta
const answerSchema = z.object({
    question: z.string(),
    answer: z.union([
        z.string(), // Si es de tipo TEXT, SIMPLE_SELECT, SIMPLE_SELECT_OTHERS
        z.array(z.string()), // Si es de tipo MULTIPLE_SELECT, MULTIPLE_SELECT_OTHERS
        z.number(), // Si es de tipo NUMBER
        z.string() // Si es de tipo DATE
    ])
});

// Define el esquema para el arreglo de respuestas
const answersArraySchema = z.array(answerSchema);



export const medic_history_create_object_body = z.object({
    patient_id: z.number(),
    questionary_id: z.number(),
    QuestionsAnwsers:  answersArraySchema
})


export type Tmedic_history_create_body = z.infer<
typeof medic_history_create_object_body
>

export const validator_medic_history = (
    body: Tmedic_history_create_body,
  ) => {
    const its_valdiate = medic_history_create_object_body.parse(body)
    return its_valdiate
  }
  


  /**
   * 
   * Esto es para que el front sepa como renderizar las preguntas mientras el admin
   * construye el formulario y tendría un json de la forma :
   * 
   * QuestionsType = 
   * [
   *    {
   *      type: "TEXT",
   *     question: "Cual es tu nombre",
   *    },
   * 
   *   {
   *    type: "SELECT",
   *    question: "Cual es tu genero",
   *   }
   * ]
   */

  /**
   * Entonces el front tendrá que parsear de alguna forma el json para saber que tipo de dato va
   * a poder enviar al back cuando se responda la pregunta. De igual forma el back tiene que poder
   * parsear para verificar que los datos recibidos son del tipo correcto
   * 
   * QuestionsAnwsers = [
   *     ESTARIA MALO
   *    {
   *      question: "Cual es tu nombre",
   *      answer : 1321321321
   *    }
   * ]
   * 
   * 
   *  QuestionsAnwsers = [
   *     
   *    {
   *      question: "Cual es tu nombre",
   *      answer : "maria perez"
   *    },
   * 
   *  {
   *    question: "Cual es tu genero",
   *   answer : "Femenino"
   *  }
   * 
   *  {
   *      question: "Patologias previas",
   * 
   *     answer : ["Diabetes", "Hipertension"]  
   *  }
   * ]
   */



// Función para validar que las preguntas sean iguales entre dos arreglos
const validateQuestionsEquality = (questions1: any[], questions2: any[]): boolean => {
    if (questions1.length !== questions2.length) {
        return false;
    }
    for (let i = 0; i < questions1.length; i++) {
        if (questions1[i].question !== questions2[i].question) {
            return false;
        }

        if(questions1[i].type=== "SIMPLE_SELECT" ||questions1[i].type=== "SIMPLE_SELECT_OTHERS"){
           if(!(questions1[i].options.includes(questions2[i].answer)))
            return false;
        }

        if(questions1[i].type=== "MULTIPLE_SELECT" ||questions1[i].type=== "MULTIPLE_SELECT_OTHERS"){
            if(!(questions2[i].answer.every((elemento: any) => questions1[i].options.includes(elemento))))
             return false;
         }
    }
    return true;
};

// Función para validar las respuestas
const validateAnswers = (questions: any[], answers: any[]): boolean => {
    for (const answer of answers) {
        const question = questions.find(q => q.question === answer.question);
        if (!question) {
            return false; // La pregunta no coincide con ninguna pregunta en el arreglo de preguntas
        }
        // Validar el tipo de respuesta
        switch (question.type) {
            case "TEXT":
            case "SIMPLE_SELECT":
            case "SIMPLE_SELECT_OTHERS":
            case "DATE":
                if (typeof answer.answer !== "string") {
                    return false;
                }
                break;
            case "MULTIPLE_SELECT":
            case "MULTIPLE_SELECT_OTHERS":
                if (!Array.isArray(answer.answer) || !answer.answer.every((a: any) => typeof a === "string")) {
                    return false;
                }
                break;
            case "NUMBER":
                if (typeof answer.answer !== "number" || !Number.isInteger(answer.answer)) {
                    return false;
                }
                break;
            default:
                return false; // Tipo de pregunta desconocido
        }
    }
    return true;
};

// Función de validación completa
export const validateQuestionnaire = (questions: any[], answers: any[]): boolean => {
    if (!validateQuestionsEquality(questions, answers)) {
        throw new Error('Error validating answers, questions or Selection answers do not match');
    }
    if (!validateAnswers(questions, answers)) {
       throw new Error('Error validating answers, answers types are not correct')
    }
    return true;
};