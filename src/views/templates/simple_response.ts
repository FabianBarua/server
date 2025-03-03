import { ACTIONS, getErrorMessage, ROLES } from '@/utils/constants'
import { Message } from "@/utils/types"
import { v4 as uuidv4 } from 'uuid';

export const simple_response_template = async (
  answer: string, id?: string
): Promise<Message> => {

  const answerId = id || uuidv4()

  let finalAnswer = answer

  if (finalAnswer.includes('parameters')) {
    finalAnswer = getErrorMessage()
  }

  return {
    id: answerId,
    type: ACTIONS.simple_response,
    content: {
      answer: finalAnswer,
    },
    role: ROLES.assistant
  }
}
