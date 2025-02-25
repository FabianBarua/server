import { ACTIONS, ROLES } from "./constants";
import { Message } from "./types";
import { Request } from "express";
import { v4 as uuidv4 } from "uuid";

// ---------------------------------------------------------------------

export const extractVariables = (
  req: Request
): {
  chatHistory: Message[];
  error: string | null;
  prompt: string;
} => {
  const { chatHistory } = req.body;

  if (Array.isArray(chatHistory) === false ) {
    return {
      chatHistory: getInitialChatHistory(),
      error: "chatHistory should be an array",
      prompt: "",
    };
  }

  if (
    chatHistory[chatHistory.length - 1]?.role !== ROLES.user ||
    (chatHistory[chatHistory.length - 1]?.type !== ACTIONS.simple_response &&
      "answer" in chatHistory[chatHistory.length - 1]?.content)
  ) {
    return {
      chatHistory,
      error:
        "The last message should be from the user and need to be simple_response",
      prompt: "",
    };
  }
  return {
    chatHistory:
      chatHistory.length > 1 ? chatHistory : [...getInitialChatHistory(), ...chatHistory],
    error: null,
    prompt: chatHistory[chatHistory.length - 1]?.content.answer,
  };
};

const getInitialChatHistory = (): Message[] => {
  return [
    {
      id: uuidv4(),
      role: ROLES.system,
      content: {
        answer: "Responda sempre em português. e da forma mais curta possível.",
      },
      type: ACTIONS.simple_response,
    },
  ];
};

// ---------------------------------------------------------------------

import * as stopword from 'stopword'
import unidecode from 'unidecode'
export function normalizeText (text: string) {
  const withoutAccents = unidecode(text)
  const lowerText = withoutAccents.toLowerCase()
  const cleanedText = lowerText.replace(/[^\w\s]/gi, '')
  return stopword.removeStopwords(cleanedText.split(' ')).join(' ')
}

// ---------------------------------------------------------------------