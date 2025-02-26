import { volume_template } from '@/views/templates/volume_template'
import { volumeActions } from '@/utils/constants'
import { Message, paramsInterface } from '@/utils/types'

async function setVolume ({
  volume
}: paramsInterface): Promise<Message> {
  return await volume_template({ volumeControl: volume || volumeActions[0].id })
}

export { setVolume }
