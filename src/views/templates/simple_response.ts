import { ACTIONS, getErrorMessage, ROLES } from '@/utils/constants'
import { Message } from "@/utils/types"
import { v4 as uuidv4 } from 'uuid';

export const simple_response_template = async (
  answer: string
): Promise<Message> => {

  let finalAnswer = answer

  if (finalAnswer.includes('parameters')) {
    finalAnswer = getErrorMessage()
  }

  return {
    id: uuidv4(),
    type: ACTIONS.simple_response,
    content: {
      answer: finalAnswer,
    },
    role: ROLES.assistant
  }
}
