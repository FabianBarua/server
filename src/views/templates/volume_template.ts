import { ACTIONS, ROLES, volumeActions } from '@/utils/constants'
import { Message } from '@/utils/types';
import { v4 as uuidv4 } from 'uuid';

export const volume_template = async ({
  volumeControl
}: {
  volumeControl: typeof volumeActions[number]['id']
}): Promise<Message> => {
  return {
    id: uuidv4(),
    type: ACTIONS.set_volume,
    content: {
      volumeControl
    },
    role: ROLES.assistant
  }
}
