import { z } from "zod";


const  QuestionType  = [
    "TEXT",
    "SIMPLE_SELECT",
    "MULTIPLE_SELECT",
    "SIMPLE_SELECT_OTHERS", // caso texto plano porque un usuario agrega una respuesta
    "MULTIPLE_SELECT_OTHERS", // caso texto plano porque un usuario agrega una respuesta
    "NUMBER",
    "DATE"
] as const;

export const baseQuestionType = z.object({
    type: z.enum(QuestionType),
    question: z.string(),
    
    // si el tipo es  multiple se aceptara un array de strings
    // Si es de tipo text o select se aceptara un string
    // Si es de tipo number se aceptara un number nada de floats solo enteros
    // Si es de tipo date se aceptara un string

    // answer: z.array(z.string()).or(z.string()).or(z.number()),
  })
  

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