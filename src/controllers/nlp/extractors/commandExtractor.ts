import { paramsInterface } from '@/utils/types'
import { tvActions } from '@/utils/constants'
import { getFromEnties } from '@/utils/helpers'

export const getCommand = async ({
  text
}: {
  text: string
}): Promise<paramsInterface> => {
  const tag = '#Command'

  const itemsById = getFromEnties({
    tag,
    text,
    enties: Object.values(tvActions).flat()
  })

  return {
    command: itemsById[0]?.id || null
  }
}
