import { ACTIONS, ROLES, tvActions } from '@/utils/constants'
import { Message } from '@/utils/types';
import { v4 as uuidv4 } from 'uuid';

export const tv_template = async ({
  tvCommand
}: {
  tvCommand: typeof tvActions[number]['id']
}): Promise<Message> => {
  return {
    id: uuidv4(),
    type: ACTIONS.send_comand_tv,
    content: {
      command: tvCommand
    },
    role: ROLES.assistant
  }
}
