
import { searchContentAction } from './movieActions'
import { getTime } from './timeActions'
import { setVolume } from './volumeActions'
import { sendTVCommand } from './tvActions'
import { getWeather } from './weatherActions'
import { aiResponse } from './aiResponse'
import { findNextMatchForTwoTeams, getNearestGameForTeam} from './teamActions'

import { ACTIONS} from '@/utils/constants'
import { executeActionParams } from '@/utils/types'

import { simple_response_template } from '@/views/templates/simple_response'

async function executeAction ({
  intent,
  params,
  chatHistory
}: executeActionParams): Promise<any> {
  
  try {
    switch (ACTIONS[intent]) {
      
      case ACTIONS.search_content:
        return await searchContentAction({
          title: params.title || '',
          keywords: params.keywords || ''
        })

      case ACTIONS.get_time_or_date:
        return await getTime()

      case ACTIONS.get_weather:
        return await getWeather()

      case ACTIONS.set_volume:
        if (!params.volume) {
          return null
        }
        return await setVolume({ volume: params.volume })

      case ACTIONS.send_comand_tv:
        if (!params.command) {
          return null
        }
        return await sendTVCommand({
          command: params.command
        })

      case ACTIONS.get_nearest_game_for_team:
        return await getNearestGameForTeam({
          team: params.team || { id: '', name: '' }
        })
      
      case ACTIONS.get_nearest_game_for_2_teams:
        return await findNextMatchForTwoTeams(
          {
            teams: params.teams || []
          }
        )

      case ACTIONS.ia_response:
        return await aiResponse({
          chatHistory: chatHistory.map((message) => ({
            role: message.role,
            content: 'answer' in message.content ? message.content.answer : JSON.stringify(message.content)
          }))
        })

      default:
        return await simple_response_template(
          'Lo siento, no pude identificar una acción a ejecutar.'
        )
    }

  } catch (error) {
    return await simple_response_template(
      error as string
    )
  }
}

export { executeAction }
