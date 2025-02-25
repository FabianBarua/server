import { Request, Response } from "express"
import { loadClassifier } from "./trainers/loadClassifier"
import { trainIntentClassifier } from "./trainers/trainClassifier"
import { extractVariables, normalizeText } from "@/utils/helpers"
import { error_template } from "@/views/templates/error_template"
import { ActionKeys } from "@/utils/types"

let classifier = loadClassifier()

if (!classifier) {
  classifier = trainIntentClassifier()
}

export const nlpController = async (req: Request, res: Response) => {

  // @ts-ignore
  const { chatHistory, error, prompt } = extractVariables(req)

  if (error) {
    return res.status(400).json(error_template({ error })) as any
  }

  const normalizedText = normalizeText(prompt)

  // @ts-ignore
  const intent = classifier.classify(normalizedText) as string as ActionKeys

  const classifications = classifier.getClassifications(normalizedText)
  // @ts-ignore
  const confidence = classifications[0].value - classifications[1].value

  return res.json({ intent, confidence, classifications }) as any


}