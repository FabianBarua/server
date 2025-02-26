import { Tool } from 'ollama'
import { simpleFunction, simpleSchema } from '@/controllers/ia/tools/simple'
import { webSearch, webSearchSchema } from './web_search'

// import { getNearestGameForTeam, getNearestGameForTeamSchema } from './fixture'
// import { ACTIONS } from '../utils/constants'
// import { volumeFunction, volumeSchema } from './set_volumen'
// import { tvCommandsFunction, tvCommandsSchema } from './tvbox_control'
// import { weatherSchema } from './weather'
// import { getTimeOrDate } from './full_time'
// import { searchContent, contentSearchSchema } from '@/core/tools/title_search'

export const TOOL_SCHEMAS: Tool[] = [
  simpleSchema,
  webSearchSchema
  // contentSearchSchema,
  // getNearestGameForTeamSchema,
  // volumeSchema,
  // tvCommandsSchema,
  // weatherSchema
  // timeOrDateSchema
]

export const availableFunctions = {
  simple_response: simpleFunction,
  web_search: webSearch
  // [ACTIONS.get_nearest_game_for_team]: getNearestGameForTeam,
  // [ACTIONS.search_content]: searchContent,
  // [ACTIONS.simple_response]: simpleFunction,
  // [ACTIONS.set_volume]: volumeFunction,
  // [ACTIONS.send_comand_tv]: tvCommandsFunction,
  // [ACTIONS.get_time_or_date]: getTimeOrDate
  // get_weather: getWeather,
}
