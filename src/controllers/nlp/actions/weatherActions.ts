import { Message } from '@/utils/types'
import { simple_response_template } from '@/views/templates'

async function getWeather (): Promise<Message> {
  return await simple_response_template('Obteniendo el clima')
}

export { getWeather }
