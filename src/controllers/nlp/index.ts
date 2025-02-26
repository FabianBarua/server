import { Request, Response, NextFunction } from "express";
import { loadClassifier } from "./trainers/loadClassifier";
import { trainIntentClassifier } from "./trainers/trainClassifier";
import { extractVariables, normalizeText } from "@/utils/helpers";
import { error_template } from "@/views/templates/error_template";
import { ActionKeys, Message } from "@/utils/types";
import { extractEntity } from "@/controllers/nlp/extractors";
import { executeAction } from "@/controllers/nlp/actions";
import { v4 as uuid } from "uuid";
import { ACTIONS, ROLES } from "@/utils/constants";
import { BayesClassifier } from "natural";

let classifier: BayesClassifier | null = null;

try {
  classifier = loadClassifier() || trainIntentClassifier();

  if (!classifier || typeof classifier.classify !== "function") {
    throw new Error("Clasificador inválido");
  }
} catch (error) {
  console.error("Error al cargar o entrenar el clasificador:", error);
}

export const nlpController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { chatHistory, error, prompt } = extractVariables(req);

    const userMessage = {
      id: uuid(),
      content: chatHistory[chatHistory.length - 1]?.content,
      type: ACTIONS.simple_response,
      role: ROLES.user,
    } as Message

    if (error) return res.status(400).json({message: error_template({ error }), userMessage});

    const normalizedText = normalizeText(prompt);
    if (!classifier) throw new Error("Clasificador no disponible");

    const intent = classifier.classify(normalizedText) as ActionKeys;
    const classifications = classifier.getClassifications(normalizedText) || [];

    if (classifications.length < 2 || classifications[0].value - classifications[1].value < 0.001) {
      return res.status(400).json({
        message: error_template({ error: "Coincidencia baja" }),
        userMessage,
      });
    }

    const params = await extractEntity({ intent, text: normalizedText });
    const result = await executeAction({ intent, params, userPrompt: prompt, chatHistory });
    
    if (!result) return res.status(400).json({message:error_template({ error: "Sin función implementada" }),userMessage});

    return res.json({
      message: result,
      userMessage
    });
  } catch (error) {
    console.error("Error en nlpController:", error);
    next(error);
    return res.status(500).json(
      {
        message: error_template({ error: "Error interno del servidor" }),
        userMessage: null
      }
    
    );
  }
};