import { ACTIONS, ROLES } from "./constants";
import { Message } from "./types";
import { Request } from "express";
import { v4 as uuidv4 } from "uuid";
import Three from 'compromise/types/view/three'

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
import nlp from "compromise";
export function normalizeText (text: string) {
  const withoutAccents = unidecode(text)
  const lowerText = withoutAccents.toLowerCase()
  const cleanedText = lowerText.replace(/[^\w\s]/gi, '')
  return stopword.removeStopwords(cleanedText.split(' ')).join(' ')
}

// ----------------- Work with Synonym -----------------

function findItemSynonym (
  query: string,
  enties: { id: string; name: string; synonyms: string[] }[]
) {
  const doc = nlp(query)
  let foundTeam = null

  enties.flat().forEach(team => {
    team.synonyms.forEach(synonym => {
      if (doc.has(normalizeText(synonym).replace(/ /g, '-'))) {
        foundTeam = team.id
      }
    })
  })

  return foundTeam || query
}

export function findTagElements (
  initialElements: string[],
  tagElements: Set<string>
) {
  let elements = []

  for (let i = 0; i < initialElements.length; i++) {
    if (tagElements.has(initialElements[i])) {
      elements.push(initialElements[i])
    } else {
      for (let j = i + 1; j < initialElements.length; j++) {
        if (tagElements.has(initialElements[i] + ' ' + initialElements[j])) {
          elements.push(initialElements[i] + '-' + initialElements[j])
          break
        }
      }
    }
  }

  return elements
}

export function addTags ({
  doc,
  entities,
  tag
}: {
  doc: Three
  entities: { id: string; synonyms: string[] }[]
  tag: string
}) {
  entities.forEach(entity => {
    doc.match(entity.id.toLowerCase()).tag(tag)
    entity.synonyms.forEach((synonym: string) =>
      doc.match(synonym.toLowerCase()).tag(tag)
    )
  })
}

interface getFromEntiesProps {
  tag: string
  text: string
  enties: { id: string; name: string; synonyms: string[] }[]
}
export const getFromEnties = ({ tag, text, enties }: getFromEntiesProps) => {
  const doc = nlp(text)

  addTags({
    doc,
    entities: enties,
    tag
  })

  const items = doc.match(tag).out('array')

  const itemsSet = new Set(enties.map(team => normalizeText(team.name)))

  const itemsSynonymsSet = new Set(
    enties
      .map(team => team.synonyms)
      .flat()
      .map(normalizeText)
  )

  const itemsInArray = findTagElements(items, itemsSet)
  const synonymosInArray = findTagElements(items, itemsSynonymsSet)

  const joinedItems = itemsInArray.concat(
    synonymosInArray.map(synonym => findItemSynonym(synonym, enties))
  )

  return enties.filter(team => {
    return joinedItems.includes(team.id)
  })
}
