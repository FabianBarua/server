import { ACTIONS, ROLES } from "@/utils/constants";
import { Message } from "@/utils/types";
import { v4 as uuidv4 } from "uuid";

interface webSearchResponse {
  id?: string;
  answer: string;
  webs: {
    url: string;
    title: string;
    description: string;
  }[];
}

export const web_search_template = async ({
  id,
  answer,
  webs,
}: webSearchResponse): Promise<Message> => {
  const answerId = id || uuidv4();

  return {
    id: answerId,
    type: ACTIONS.web_search,
    content: {
      answer: answer,
      webs: webs,
    },
    role: ROLES.assistant,
  };
};
