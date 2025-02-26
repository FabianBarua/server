// import { extractKey, paramsInterface } from '@/types/nlp'
import { ACTIONS } from '@/utils/constants'

import { getFirstTeam, getTwoTeams } from '@/controllers/nlp/extractors/teamExtractor'
import { contentExtractor } from '@/controllers/nlp/extractors/contentExtractor'
import { getVolume } from '@/controllers/nlp/extractors/volumeExtractor'
import { getCommand } from '@/controllers/nlp/extractors/commandExtractor'
import { extractKey, paramsInterface } from '@/utils/types'

export const allExtractors = {
  [ACTIONS.get_nearest_game_for_team]: getFirstTeam,
  [ACTIONS.get_nearest_game_for_2_teams]: getTwoTeams,
  [ACTIONS.search_content]: contentExtractor,
  [ACTIONS.set_volume]: getVolume,
  [ACTIONS.send_comand_tv]: getCommand,
  [ACTIONS.ia_response]: () => Promise.resolve({})
}

interface extractEntityProps {
  intent: extractKey
  text: string
}

export async function extractEntity ({
  intent,
  text
}: extractEntityProps): Promise<paramsInterface> {
  const extractor = allExtractors[intent]

  if (!extractor) {
    return {}
  }

  const result = await extractor({ text })
  return result
}
