export * from './football'
export * from './actions'
export * from './errorMessages'

export const ROLES = {
    user: 'user',
    assistant: 'assistant',
    system: 'system'
}

export const ACTIONS = {
    simple_response: 'simple_response',
    search_content: 'search_content',
    get_time_or_date: 'get_time_or_date',
    get_weather: 'get_weather',
    set_volume: 'set_volume',
    send_comand_tv: 'send_comand_tv',
    get_nearest_game_for_team: 'get_nearest_game_for_team',
    ia_response: 'ia_response'
}