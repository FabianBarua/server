import { simple_response_template } from '@/views/templates'
import { Message } from 'ollama'
import { Message as MessageResponse } from '@/utils/types'
import { fetchOllamaResponse } from '@/services/OllamaService'

async function aiResponse ({
  chatHistory
}: {
  chatHistory: Message[]
}): Promise<MessageResponse> {
  try {
    const chatResponse = await fetchOllamaResponse({
      chatHistory,
      useTools: false,
    })

    return simple_response_template(chatResponse.message.content)

  } catch (error) {
    console.error('Error en aiResponse:', error)
    return simple_response_template('No pude procesar tu solicitud')
  }

}

export { aiResponse }
