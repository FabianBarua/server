import { allExtractors } from "@/controllers/nlp/extractors";
import { ACTIONS, ROLES } from "@/utils/constants";

type role = (typeof ROLES)[keyof typeof ROLES];

export interface Message {
  id: string;
  type: string;
  content:
    | simpleResponse
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

export interface paramsInterface {
  entity?: string;
  teams?: team[];
  team?: team;
  title?: string;
  keywords?: string;
  volume?: string | null;
  command?: string | null;
}

export interface executeActionParams {
  intent: ActionKeys;
  params: paramsInterface;
  userPrompt: string;
  chatHistory: Message[];
}

import { SearchResponse } from "meilisearch";
import { Tool } from "ollama";

// ------- RESPONSES -------

export interface simpleResponse {
  answer: string;
}
export interface searchContentResponse extends SearchResponse {}

export interface MovieSeriesSearchType extends Tool {}

export interface volumeContentResponse {
  volumeControl: string;
}

export interface tvCommandContentResponse {
  command: string;
}
