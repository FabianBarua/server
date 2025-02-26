import { paramsInterface } from '@/utils/types'
import { volumeActions } from '@/utils/constants'
import { getFromEnties } from '@/utils/helpers'

export const getVolume = async ({
  text
}: {
  text: string
}): Promise<paramsInterface> => {
  const tag = '#Volume'

  console.log(
    getFromEnties({
      tag,
      text,
      enties: Object.values(volumeActions).flat()
    })
  )

  const teamsById = getFromEnties({
    tag,
    text,
    enties: Object.values(volumeActions).flat()
  })

  return {
    volume: teamsById[0]?.id || null
  }
}
