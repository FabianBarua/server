import { Message } from '@/utils/types'
import { simple_response_template } from '@/views/templates'

async function getTime (): Promise<Message> {
  const currentTime = new Date().toLocaleTimeString()
  return await simple_response_template(`La hora actual es: ${currentTime}`)
}

async function getDate (): Promise<Message> {
  const currentDate = new Date().toLocaleDateString()
  return await simple_response_template(`La fecha actual es: ${currentDate}`)
}

export { getTime, getDate }
