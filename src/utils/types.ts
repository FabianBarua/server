import { allExtractors } from "@/controllers/nlp/extractors";
import { ACTIONS, ROLES } from "@/utils/constants";
import { Message as OllamaMessage } from "ollama";

type role = (typeof ROLES)[keyof typeof ROLES];

export interface Message {
  id: string;
  type: string;
  content:
    | simpleResponse
    | web_searchResponse
    | searchContentResponse
    | MovieSeriesSearchType
    | volumeContentResponse
    | tvCommandContentResponse;
  role: role;
}

export type ActionKeys = keyof typeof ACTIONS;
export type extractKey = keyof typeof allExtractors;

export interface team {
  id: string;
  name: string;
}

export interface teamMatchQueryParams {
  team: team;
}

export type userMessage = {
  id: string;
  content: simpleResponse
  type: ActionKeys;
  role: role;
} | null;


export interface paramsInterface {
  entity?: string;
  teams?: team[];
  team?: team;
  title?: string;
  keywords?: string;
  volume?: string | null;
  command?: string | null;
  answer?: string;
  userPrompt?: string;
  chatHistory?: OllamaMessage[];
  messageUUID?: string;
  res?: Response
  userMessage?: userMessage;
}

export interface streamResponseInterface {
  name: ActionKeys;
  parameters: paramsInterface
}

export interface executeActionParams {
  intent: ActionKeys;
  params: paramsInterface;
  userPrompt: string;
  chatHistory: Message[];
}

import { SearchResponse } from "meilisearch";
import { Tool } from "ollama";
import { Response } from "express";

// ------- RESPONSES -------

export interface simpleResponse {
  answer: string;
}

export interface web_searchResponse {
  answer: string;
  webs: {
    title: string;
    url: string;
    description: string;
  }[]
}

export interface searchContentResponse extends SearchResponse {}

export interface MovieSeriesSearchType extends Tool {}

export interface volumeContentResponse {
  volumeControl: string;
}

export interface tvCommandContentResponse {
  command: string;
}
