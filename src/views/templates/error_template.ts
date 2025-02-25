

import { getErrorMessage, ROLES } from '@/utils/constants';
import { Message } from '@/utils/types'
import { v4 as uuidv4 } from 'uuid';

interface error_template_params {
  error: string | null
}

export const error_template = ({ error }: error_template_params) : Message => {
  error = error || getErrorMessage()
  return {
    id: uuidv4(),
    type: 'error',
    content: { answer: error },
    role: ROLES.assistant
  }
}
